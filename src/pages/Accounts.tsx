import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {getLid} from "../helpers";
import {Form2,createFields, createFormInputs, createHandleSubmit,Table2} from "@7casa/clib22-helpers";

export default function Accounts(){


    const {
        get,put,post,del
    } = window.api.createCrud("accounts",getLid())

    const cols = [
        {
            Header: 'Account',
            columns: [
                {
                    Header:"Name",
                    accessor:"name",
                },
                {
                    Header:"Account Holder",
                    accessor:(d:any) => {
                        const str = `${d.firstName} ${d.lastName}`
                        return str.substr(0,10)+"..."
                    },
                },
                {
                    Header:"Email",
                    accessor:"email",
                },
                {
                    Header:"Address",
                    accessor:(d:any) => {
                        const str = `${d.line1}, ${d.line2}`
                        return str.substr(0,20)+"..."
                    },
                }
            ],
        }
    ]

    const fields = createFields([
        "name",
        "first name",
        "last name",
        "line1",
        "line2",
        "line3",
        "line4",
        "email",
        "password",
        "phone number",
    ],{allRequired:true, bulk:true})

    const profileFormConfig = {
        inputs:createFormInputs(fields),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post(data)
            },
            async onEdit(data){
                await put(data.id, data)
            }
        })
    }

    return (
        <>
            <Table2
                cols={cols}
                get={get}
                put={put}
                update={false}
                del={del}
                post={post}
                form={
                    ({data,cleanup}) => <Form2 data={data} cleanup={cleanup} {...profileFormConfig} />
                }
            />

        </>
    )
}