import React, {FormEvent, useCallback, useEffect, useState} from "react";
import { Form } from "react-bootstrap";
import {Form2,createFields, createFormInputs, createHandleSubmit,Table2} from "@7casa/clib22-helpers"

export default function Users(){



    const {
        get,put,post,del
    } = window.api.createCrud("users","")

    const cols = [
        {
            Header:"Email",
            accessor:"email",
        },
        {
            Header:"Display Name",
            accessor:"displayName",
        },
        {
            Header:"Role",
            accessor:"role",
        },
    ]


    const fields = createFields([
        "email",
        "displayName",
    ],{allRequired:true})

    const profileFormConfig = {
        inputs:createFormInputs(fields).map(f => {
            if (f.uid === "role"){
                const Select = (p:any) => (
                    <Form.Control as="select" {...p} selected={p.defaultValue}>
                        {["user","admin"].map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </Form.Control>
                )
                return ({...f, Comp:Select})
            } else {
                return f
            }
        }),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post({...data, id:window.auth.currentUser?.email})
            },
            async onEdit(data){
                await put(data.id, data)
            },
        })
    }


    return (
        <Table2
            cols={cols}
            get={get}
            del={del}
            post={post}
            form={
                ({data,cleanup}) => <Form2 data={data} cleanup={cleanup} {...profileFormConfig} />
            }
        />
    )
}