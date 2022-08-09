export function LoginUtil({email,password}){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(password === "password123" && !!email){
                resolve();
            }
            else{
                reject(new Error("invalid user"));
            }
        }, 1000);
    });

}