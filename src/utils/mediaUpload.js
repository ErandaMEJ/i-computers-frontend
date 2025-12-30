import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY


// console.log(url, key
const supabase = createClient(url, key)
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