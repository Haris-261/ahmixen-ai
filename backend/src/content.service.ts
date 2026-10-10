import {ConflictException,Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Program,ProgramApplication,Resource,Testimonial} from './schemas';

@Injectable()
export class ContentService {
 constructor(@InjectModel(Program.name)private programs:Model<Program>,@InjectModel(Resource.name)private resources:Model<Resource>,@InjectModel(Testimonial.name)private testimonials:Model<Testimonial>,@InjectModel(ProgramApplication.name)private applications:Model<ProgramApplication>){}
 model(kind:string):Model<any>{return kind==='programs'?this.programs:kind==='resources'?this.resources:this.testimonials}
 async list(kind:string,published=false){const query=published?(kind==='programs'?{status:'published'}:{published:true}):{};return this.model(kind).find(query).sort(kind==='programs'?{displayOrder:1,createdAt:-1}:{createdAt:-1}).limit(100).lean()}
 async create(kind:string,d:object){try{return await this.model(kind).create(d)}catch(e:any){if(e?.code===11000)throw new ConflictException('This program slug is already in use');throw e}}
 async update(kind:string,id:string,d:object){let row;try{row=await this.model(kind).findByIdAndUpdate(id,d,{new:true,runValidators:true})}catch(e:any){if(e?.code===11000)throw new ConflictException('This program slug is already in use');throw e}if(!row)throw new NotFoundException('Item not found');return row}
 async remove(kind:string,id:string){const row=await this.model(kind).findByIdAndDelete(id);if(!row)throw new NotFoundException('Item not found');return{deleted:true}}
 async publicProgram(slug:string){const p=await this.programs.findOne({slug,status:'published',type:'program'}).lean();if(!p)throw new NotFoundException('Program not found');const testimonials=await this.testimonials.find({published:true,$or:[{programIds:String(p._id)},{_id:{$in:p.testimonialIds||[]}}]}).sort({displayOrder:1}).lean();return{...p,testimonials}}
 async adminProgram(id:string){const p=await this.programs.findById(id).lean();if(!p)throw new NotFoundException('Program not found');return p}
 async duplicateProgram(id:string){const source=await this.adminProgram(id)as any;delete source._id;delete source.createdAt;delete source.updatedAt;let slug=`${source.slug}-copy`,n=2;while(await this.programs.exists({slug}))slug=`${source.slug}-copy-${n++}`;return this.programs.create({...source,title:`${source.title} (Copy)`,slug,status:'draft',isFeatured:false})}
 async setProgramStatus(id:string,status:string){return this.update('programs',id,{status})}
 async apply(slug:string,data:object){const program=await this.programs.findOne({slug,status:'published',type:'program'}).select('_id title').lean();if(!program)throw new NotFoundException('Program not found');return this.applications.create({...data,programId:String(program._id),programTitle:program.title,status:'new'})}
 async listApplications(){return this.applications.find().sort({createdAt:-1}).limit(500).lean()}
 async homepage(){const[programs,resources,testimonials,courses]=await Promise.all([this.programs.find({status:'published',type:'program'}).sort({displayOrder:1}).limit(6).lean(),this.resources.find({published:true}).limit(8).lean(),this.testimonials.find({published:true}).sort({displayOrder:1}).limit(12).lean(),this.programs.find({status:'published',type:'course'}).limit(3).lean()]);return{programs,resources,testimonials,courses}}
 async stats(){const[programs,publishedPrograms,resources,testimonials]=await Promise.all([this.programs.countDocuments({type:'program'}),this.programs.countDocuments({type:'program',status:'published'}),this.resources.countDocuments(),this.testimonials.countDocuments()]);return{programs,publishedPrograms,resources,testimonials}}
}
