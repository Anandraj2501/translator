const SelectTag = document.querySelectorAll("select");
const translate_button = document.querySelector("button");
const formtext = document.querySelector(".from-text");
const totext = document.querySelector(".to-text");
const copy_fromtext= document.getElementById("from-text_copy");
const copy_totext = document.getElementById("to-text-copy");
const exchange_btn = document.querySelector(".fa-exchange-alt");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fb96853d08msh9c8fc7809090f90p119abajsnc3dffbc81c5e',
		'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
	}
};


SelectTag.forEach((tag,id)=>{
    for(let country in countries){
        let selected;
        if(id==0 && country=="en-GB"){
            selected="selected";
        }
        else if(id==1 && country=="hi-IN"){
            selected="selected";
        }
        let options =`<option value="${country}" ${selected}>${countries[country]}</option>`
        tag.insertAdjacentHTML("beforeend",options);
    }
})

translate_button.addEventListener("click",()=>{
    let text = formtext.value;
    const translatefrom = SelectTag[0].value;
    const translateto = SelectTag[1].value;
    //console.log(translatefrom,translateto);
    // let apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
    let apiurl = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${translatefrom}|${translateto}&q=${text}`;

    fetch(apiurl,options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            totext.value = data.responseData.translatedText;
        })
})

copy_fromtext.addEventListener("click", ()=>{
    let text;
    text = formtext.value;
    navigator.clipboard.writeText(text);
    alert("copied: "+text);
})

copy_totext.addEventListener("click",()=>{
    let text;
    text = totext.value;
    navigator.clipboard.writeText(text);
    alert("copied: "+text);
})

exchange_btn.addEventListener("click",()=>{
    let temptext = formtext.value,
    templang = SelectTag[0].value;
    SelectTag[0].value = SelectTag[1].value;
    SelectTag[1].value = templang;
    formtext.value = totext.value;
    totext.value = temptext;
})