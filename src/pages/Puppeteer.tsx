import React from "react";
import {getLid} from "../helpers";
import { Form } from "react-bootstrap";
import {Table2,createComp, createFields, createFormInputs, createHandleSubmit,Form2} from "@7casa/clib22-helpers"


export default function Puppeteer(){

    const lid = getLid()

    const {
        get,put,post,del
    } = window.api.createCrud("puppeteer","")


    const cols = [
        {
            Header: 'Puppeteer',
            columns: [
                {
                    Header:"Name",
                    accessor:"name",
                },
                {
                    Header:"Code",
                    accessor:(d:any) => d.code.substr(0,20)+"...",
                },
            ],
        }
    ]


    const fields = createFields([
        "name",
        "code",
    ],{allRequired:true})

    const formConfig = {
        inputs:createFormInputs(fields).map(f => {
            if(f.id === "code"){
                return ({
                    ...f,
                    Comp:createComp((props) => (
                        <Form.Control as="textarea" rows={3} {...props} />
                    ))
                })
            } else return ({...f})
        }),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post(data)
            },
            async onEdit(data){
                await put(data.id, data)
            },
        })
    }

    return (
        <>
            <Table2
                cols={cols}
                get={get}
                put={put}
                update={true}
                del={del}
                post={post}
                form={
                    ({data,cleanup}) => <Form2 data={data} cleanup={cleanup} {...formConfig} />
                }
            />
        </>
    )
}