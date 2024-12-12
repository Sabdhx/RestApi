export interface User {
   id:number,
   name:string,
   email:string,
   password:string,
   profilePicture:string
}

export interface book {
   _id:number,
   title:string,
   author:string,
   genre:string,
   coverImage:string,
   file:string,
   createdAt:number,
   updatedAt:number
}