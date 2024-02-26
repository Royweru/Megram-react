import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.name,
            user.email,
            user.password
        )

        if(!newAccount){
            throw new Error("No account")
        }
        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDb({
            accountId:newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl:avatarUrl
        })
        console.log(newUser)
        return newAccount
    } catch (error) {
        console.error(error)
        return error
    }
    
}


export async function saveUserToDb(user:{
    accountId:string,
    email:string,
    name:string,
    imageUrl:URL ,
    username?:string
}) {
   try {
     const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
     )
     return newUser
   } catch (error) {
     console.error(error)
   }
}