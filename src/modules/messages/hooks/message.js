import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { createMessage, getMessages } from "../actions"
export const prefetchMessages = async(projectId,queryClient)=>{
    await queryClient.prefetchQuery({
        queryKey:["messages",projectId],
        queryFn:async()=> getMessages(projectId),
        staleTime:10000,
    })
}

export const useGetMessages = (projectId)=>{
    return useQuery({
        queryKey:["messages",projectId],
        queryFn:async()=> getMessages(projectId),
        staleTime:10000,
        refetchInterval:(data)=>{
            return data?.length ? 5000 : false;
        }
    })
}

export const useCreateMessage =(projectId)=>{
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:(value)=> createMessage(value,projectId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["messages",projectId]
            })
        }
    })
}