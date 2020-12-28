import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";

interface Select2Props {
    get: () => Promise<any[]>
    defaultValue:string
    name:string
}
export default function Select2({get,...rest}:Select2Props){

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        get().then(setData)
    },[])


    return (
        <Form.Control as="select" custom {...rest}>
            {data.map((f:any) => (
                <option value={`__json${JSON.stringify(f)}`}>{f.name}</option>
            ))}
        </Form.Control>
    )
}