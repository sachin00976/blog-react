import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);  // Assuming this should be project ID
        this.databases = new Databases(this.client);  // Corrected typo
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const documentId=slug 
            const dbpost= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            if (dbpost && dbpost.$id) {
                console.log("Document ID:", dbpost.$id);
                return dbpost;}
            else
            {
                console.log("failed to execute")
            }
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", ["active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    async getUserPosts(userId, queries = [Query.equal("status", ["active"])]) {
        try {
            // Add a query to filter by the userId
            const userQuery = Query.equal("userId", [userId]);
    
            // Combine userQuery with existing queries
            const combinedQueries = [...queries, userQuery];
    
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                combinedQueries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return null; // or throw error if you want to handle it elsewhere
        }
    }
    

    async deleteFile(fieldId) {
        try {
            await this.bucket.deleteFile(  // Corrected to use the Storage instance
                conf.appwriteBucketId,
                fieldId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fieldId) {
        return this.bucket.getFilePreview(  // Corrected this.bucket usage
            conf.appwriteBucketId,
            fieldId
        );
    }
}

const service = new Service();
export default service;
