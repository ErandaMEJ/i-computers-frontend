import { createClient } from "@supabase/supabase-js";

const url ="https://hixgctzoybctzdjoqtmh.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeGdjdHpveWJjdHpkam9xdG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1ODgsImV4cCI6MjA3ODYxNzU4OH0._F1-sSJt5mZzRKx0KxKncuU5j-oaxKtGFFruzNBTY68"

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