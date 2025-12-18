"use server";
import {MessageRole,MessageType} from "@prisma/client"
import db from "../../../lib/db";
import { inngest } from "@/inngest/client";
import { getCurrentUser } from "@/modules/auth/actions";
import { includes } from "zod";

export const createMessage = async(Value,projectId)=>{
    const user = await getCurrentUser();
    if(!user){
        return {success:false,error:"No authenticated user found"}
    }
    try {
        const project = await db.project.findUnique({
            where:{id:projectId,userId:user.id}
        })
        if(!project){
            return {success:false,error:"Project not found"}
        }
        const newMessage = await db.message.create({
            data:{
                type:MessageType.RESULT,
                role:MessageRole.USER,
                content:Value,
                projectId:project.id
            }
        })
        await inngest.send({
            name:"code-agent/run",
            data:{
                value:Value,
                projectId:project.id,
            }
        })
        return {success:true,message:newMessage}
    } catch (error) {
        return {success:false,error:"Failed to create message"}
    }
}

export const getMessages = async(projectId)=>{
    const user = await getCurrentUser();
    if(!user){
        return {success:false,error:"No authenticated user found"}
    }
    try {
        const project = await db.project.findUnique({
            where:{id:projectId,userId:user.id}
        })
        if(!project){
            return {success:false,error:"Project not found"}
        }
        const messages = await db.message.findMany({
            where:{projectId},
            orderBy:{
                updatedAt:"asc"
            },
            includes:{
                fragments:true
            }
        })
        return {success:true,messages}
    } catch (error) {
        return {success:false,error:"Failed to fetch messages"}
    }
}

