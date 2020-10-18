

import React from 'react'

/**
 * We identify keys in text when them are between {{}}
 * @param keysToReplace: {key: value}
 * @param text: text to replace
 */
export const replaceKeys = (keysToReplace, text) => {
    const pattern = /{{(\w*)}}/g;
    console.log(keysToReplace);
    return text.replace(pattern, (_, key)=> {
        return keysToReplace[key] ? keysToReplace[key] : key
    });
}

/**
 * We identify tags in text when them are <tag></tag>
 * The content inside tags is put inside the component
 * 
 * @param text: text to replace
 * @param tag: tag to replace. e.g small
 * @param Component: component to replace tag
 * @param props: props of the component
 */
export const replaceTagWithComponent = (text, tag, Component, props) => {
    const pattern = new RegExp(`<${tag}>(.*)</${tag}>`, 'g');
    
    let [prevText, betweenTags, afterText] = text.split(pattern);
    const component = <Component {...props}>{betweenTags}</Component>
    
    return (
        <>
            {prevText}{component}{afterText}
        </>
    )
}