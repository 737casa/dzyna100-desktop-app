import React, {FC, FormEvent, useEffect, useState} from "react";
import {Button, Form, Toast} from "react-bootstrap";
import {camelCase, sentenceCase} from "change-case";
import {v4} from "uuid";


interface Chatbot2InputProps {
    id:string
    uid:string
    type:string
    label:string
    editing?:boolean
    Comp?:FC<{defaultValue:string,name:string}>
}
interface Chatbot2Props {
    inputs:Chatbot2InputProps[]
    handleSubmit:(e:FormEvent<HTMLFormElement>)=>void
    data:any
    cleanup?:() => void
}
export default function Chatbot2({inputs,handleSubmit,data,cleanup}:Chatbot2Props){
    const [chatState,setChatState] = useState<Chatbot2InputProps[]|null>(null)

    useEffect(() => {
        const filteredInputs = inputs
            .map(mapTransformInputs)
            .filter(filterRemoveRequired)
        setChatState(filteredInputs)
    },[])

    function mapTransformInputs(f:any){
        const id = f.id.replaceAll(/__|datetime/g,"")
        function getType(id:string){
            switch (id){
                case "required__":
                case "viewing__":
                case "id__":
                case "editing__": return "hidden"
                case id.includes("datetime") ? f.id : "": return "datetime-local"
                default: return "text"
            }
        }
        return ({
            ...f,
            id:camelCase(id),
            type:getType(f.id),
            label:sentenceCase(id),
        })
    }
    function filterRemoveRequired(f:any){return f.uid !== "required__"}
    function someContainsRequired(f:any){return f.uid === "required__"}


    const question = chatState?.find(f => !f.editing)

    return (
        <Form onSubmit={async (e) => {
            await handleSubmit(e)
            await cleanup?.()
        }}>
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Bot: Enter account details in bulk</Toast.Body>
                <Toast.Body>You: <br/><textarea></textarea></Toast.Body>
            </Toast>
            {/*{filteredInputs.map((f:any) => (*/}
            {/*    <Form.Group controlId={f.id} key={f.id}>*/}
            {/*        {f.type !== "hidden" && (<Form.Label>{f.label}</Form.Label>)}*/}
            {/*        {*/}
            {/*            f.Comp ?*/}
            {/*                <f.Comp*/}
            {/*                    name={f.id}*/}
            {/*                    defaultValue={data ? data[f.id] : ""}*/}
            {/*                    required={inputs.some(someContainsRequired)}*/}
            {/*                /> :*/}
            {/*                <Form.Control*/}
            {/*                    type={f.type}*/}
            {/*                    name={f.id}*/}
            {/*                    defaultValue={data ? data[f.id] : ""}*/}
            {/*                    required={inputs.some(someContainsRequired)}*/}
            {/*                />*/}
            {/*        }*/}
            {/*    </Form.Group>*/}
            {/*))}*/}
            {!data?.viewing && (
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            )}
        </Form>
    )
}

interface CreateCompFunProps {
    name:string
    defaultValue:string
}
export function createComp(createComponent:FC<{defaultValue:string, name:string}>){
    return createComponent
}

export function createFormInputs(inputs:string[]):Chatbot2InputProps[]{
    const preserve__ = /(?<!^_*)[^A-Z0-9]+/gi
    return inputs.map(f => ({
        id:f.includes("__") ? f : camelCase(f),
        input:"text",
        label: f.includes("__") ? f : sentenceCase(f),
        type:"text",
        uid:f.toLowerCase()
    }))
}

interface CreateFormFieldsOptionProps {
    allRequired?:boolean
}
export function createFields(fields:string[],options?:CreateFormFieldsOptionProps){
    return fields.concat([
        "viewing__","editing__","id__"
    ]).concat(options?.allRequired ? ["required__"] : [])
}

interface CreateHandleSubmitProps {
    onCreate:(data:any) => void
    onView?:(data:any) => void
    onEdit?:(data:any) => void
}
