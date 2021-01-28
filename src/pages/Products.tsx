import React, {FormEvent, useCallback, useEffect, useState} from "react";
import Select2 from "../lib/Select2";
import {createPuppeteer2, createPuppeteer2List, createPuppeteer2ListMenuFunction} from "../lib/Puppeteer2";
import {Form2,createComp, createFields, createFormInputs, createHandleSubmit,Table2} from "@7casa/clib22-helpers"
export default function Products(){

    const {
        get:_get,
    } = window.api


    const {
        get,put,post,del
    } = window.api.createCrud("products",window.auth.currentUser?.email!)

    const {
        get:getAccounts,
    } = window.api.createCrud("accounts",window.auth.currentUser?.email!)


    async function getAvailableAccount(){
        const accounts = await getAccounts()
        const products = await get()
        const productAccountIds = products.map((f:any) => f.account.id)
        const availableAccounts = accounts.filter((f:any) => !productAccountIds.includes(f.id))
        return availableAccounts
    }

    const cols = [
        {
            Header: 'Products',
            columns: [
                {
                    Header:"Link",
                    accessor:"link",
                },
                {
                    Header:"Size",
                    accessor:"size",
                },
                {
                    Header:"Release Date",
                    accessor:"releaseDate",
                },
                {
                    Header:"Account",
                    accessor:(d:any) => d.account.name,
                }
            ],
        }
    ]


    const getCode = (name:string) => async () => {
        return (await _get("puppeteer","","name","==",name)())[0].code as string
    }


    const cols2 = createPuppeteer2List({menus:["login","homepage","checkout"],getCode})

    const fields = createFields([
        "link",
        "size",
        "account",
    ],{allRequired:true})

    const formConfig = {
        inputs:createFormInputs(fields).map(f => {
            if(f.uid === "account"){
                return ({
                    ...f,
                    Comp:createComp((props) => (
                        <Select2 get={getAvailableAccount} {...props} />
                    ))
                })
            } else {
                return f
            }
        }),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                if(Array.isArray(data)){

                } else {
                    const {callMethod} = createPuppeteer2({product:data,options:{headless:true},getCode})
                    const r = await callMethod("getReleaseDate")
                    const {get} = await (await import("../lib/Puppeteer2Helpers")).default({product:data})
                    const releaseDate = get.releaseDate(r)
                    await post({...data, releaseDate})
                }
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
                cols2={cols2}
                get={get}
                del={del}
                post={post}
                form={
                    ({data,cleanup}) => <Form2 data={data} cleanup={cleanup} {...formConfig} />
                }
            />
        </>
    )
}