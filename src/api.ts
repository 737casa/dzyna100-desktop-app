import "firebase/firestore";

type PostProps = {id:string, [key:string]:any}|{id:string, [key:string]:any}[]

const {
    users,
} = {
    users:"users",
}

export async function getLicence(licence:any){
    const collection = await window.firestore.collection(`key`).where("key","==",licence).get()
    const docs = collection.docs.map(d => d.data())
    return docs[0]
}


export const get = (collection:string, lid?:string, ...filter:any) => async (cb?:(data:any) => void) => {
    let col;
    if (!lid){
        col = filter.length === 3 ?
            await window.firestore.collection(cp(collection)).where(filter[0],filter[1],filter[2]).get() :
            await window.firestore.collection(cp(collection)).get()
    } else {
        console.log(cp(users,lid,collection),"best",[users,lid,collection])
        col = filter.length === 3 ?
            await window.firestore.collection(cp(users,lid,collection)).where(filter[0],filter[1],filter[2]).get() :
            await window.firestore.collection(cp(users,lid,collection)).get()
    }

    const docs = col.docs.map(d => d.data())
    cb && cb(docs)
    return docs
}
export const put = (collection:string, lid?:string) => async (id:string, data:any) => {
    if (!lid){
        return window.firestore.collection(cp(collection)).doc(id).update(data)
    } else {
        return window.firestore.collection(cp(users,lid,collection)).doc(id).update(data)
    }

}
export const post = (collection:string,lid:string) => async (data:PostProps) => {
    console.log(lid,"king")

    if(!lid){
        if(Array.isArray(data)){
            const batch = window.firestore.batch()
            data.forEach(f => {
                batch.set(window.firestore.collection(cp(collection)).doc(f.id),f)
            })
            return batch.commit().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            return window.firestore.collection(cp(collection)).doc(data.id).set(data).then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    } else {
        if(Array.isArray(data)){
            const batch = window.firestore.batch()
            data.forEach(f => {
                batch.set(window.firestore.collection(cp(users,lid,collection)).doc(f.id),f)
            })
            return batch.commit().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            return window.firestore.collection(cp(users,lid,collection)).doc(data.id).set(data).then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }

}
export const del = (collection:string,lid:string) => async (id:string) => {
    if(!lid){
        return window.firestore.collection(cp(collection)).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        return window.firestore.collection(cp(users,lid,collection)).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}

export const createCrud = (collection:string, lid:string) => {
    return ({
        get:get(collection,lid),
        put:put(collection,lid),
        post:post(collection,lid),
        del:del(collection,lid)
    })
}

function cp(...path:any[]){
    return path.toString().replaceAll(",","/")
}





