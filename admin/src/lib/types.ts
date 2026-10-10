export type Program={_id:string;title:string;description:string;instructor:string;duration:string;level:string;status:string;image:string;ctaUrl:string;published:boolean};
export type Resource={_id:string;title:string;category:string;description:string;image:string;ctaLabel:string;ctaUrl:string;published:boolean};
export type Testimonial={_id:string;memberName:string;thumbnail:string;videoUrl:string;testimonialText:string;programName:string;featured:boolean;published:boolean};
export type Content={programs:Program[];resources:Resource[];testimonials:Testimonial[];courses:Program[]};
