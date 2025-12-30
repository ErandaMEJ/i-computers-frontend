import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function uploadFile(file){

    return new Promise(
        (resolve, reject)=>{
            const timeStamp = Date.now()
            const fileName = timeStamp + "-" + file.name
             supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600', 
            upsert: false,
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(publicUrl)
            }
        ).catch(
            (error)=>{
                reject(error)
            }
        )
        }
    )
}

//   console.log(file)
//        .then(
//             ()=>{
//                 const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
//                 console.log(publicUrl)
//             }
//         )