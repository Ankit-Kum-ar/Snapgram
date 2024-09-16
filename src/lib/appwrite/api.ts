import { INewUser } from "../../types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, database } from "./config";

export async function createUserAccount (user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(), // Create unique ID for the user by appwrite.
            user.email,
            user.password,
            user.name
        );

        // Now we want to add new user to our database.
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Creating saveUserToDB function.
export async function saveUserToDB(user : {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,
}) {
    try {
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error);        
    }
}