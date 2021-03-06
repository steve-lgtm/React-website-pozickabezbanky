import "../../App.css";
import "./Ziadost.css";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Select from 'react-select'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';



function PMT(ir, np, pv, fv, type) {
  //  * ir   - interest rate per month
  //  * np   - number of dobas (months)
  // * pv   - present value
  // * fv   - future value
  //  * type - when the payments are due:
  //   *        0: end of the doba, e.g. end of month (default)
  //  *        1: beginning of doba

  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return pmt;
}

const style = {
  display:'flex',
  flexDirection:'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  textAlign: 'justify',
};
const style2 = {
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'

};
const style3 = {
  display:'flex',
  flexDirection:'column',
  alignItems:'center',

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function Ziadost() {
  const [mounthsuma, setMounthsuma] = useState(95.48);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzI69xGdz3Qnr-IInHExOFJy53Z2E8pZNysrIgMPGlZHNj8vNMlCXsVBDFpDai60BmISg/exec"
    const [loading, setLoading] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    const [suhlasOU, setSuhlasOU] = useState(false)
    const navigate = useNavigate();

    const [prechodneByvanie, setPrechodneByvanie] = useState(false)

    const formRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      suma: 5000,
      doba: 8,
      meno: "",
      priezviskoMatky: "",
      file: '',
      file1:'',
      file234:'',
      zamestnanie: "",
      rodinn??stav:'',
      vzdelanie:'',
      adresa:'',
      obecaPs??: '',
      typB??vania:'',
      b??vanieOd:'',
      adresaDorucovacia:'',
      obecaPs??Dorucovacia: '',
      typB??vaniaDorucovacia:'',
      b??vanieOdDorucovacia:'',
      email:'',
      mobil:'',
      tentoMesiac:'',
      prech??dzaj??ciMesiac:'',
      predPrech??dzaj??ciMesiac:'',
      IBAN:'',
      isfinalErrorsEmpty:'',
      rodn??????slo:'',
      n??zovZamestn??vate??a:'',
      I??Ozamestn??vate??a:'',
      d??tumDoZamestnania:'',
      ????sloOP:'',
      suhlas:false




    },

    onSubmit: (values) => {
      setLoading(true)

      fetch(scriptUrl, {
      method: 'POST',
      body: new FormData(formRef.current),

  }).then(res => {
          console.log("SUCCESSFULLY SUBMITTED")
          navigate('/dakujeme')
      })
      .catch(err => console.log(err))
    },
    validate: (values) => {
      let errors = {};
/*
      if (!values.meno) {
        errors.meno = "Povinn?? pole!";
      }
      if (!values.adresa) {
        errors.adresa = "Povinn?? pole!";
      }
      if (!values.IBAN) {
        errors.IBAN = "Povinn?? pole!";
      }
      if (!values.obecaPs??) {
        errors.obecaPs??= "Povinn?? pole!";
      }
      if (values.zamestnanie === "Zamestnanec na SK"||values.zamestnanie === "Zamestnanec v zahrani????"||values.zamestnanie === "Opatrovate?? ??ivnostn??k EU"||values.zamestnanie === "??ivnostn??k na SK"){
        if(!values.n??zovZamestn??vate??a){
          errors.n??zovZamestn??vate??a="Povinn?? pole!";
        }
        if(!values.d??tumDoZamestnania){
          errors.d??tumDoZamestnania="Povinn?? pole!";
        }
      }

      if (!values.typB??vania) {
        errors.typB??vania = "Povinn?? pole!";
      }
      if (!values.tentoMesiac) {
        errors.tentoMesiac = "Povinn?? pole!";
      }
      if (!values.prech??dzaj??ciMesiac) {
        errors.prech??dzaj??ciMesiac = "Povinn?? pole!";
      }
      if (!values.predPrech??dzaj??ciMesiac) {
        errors.predPrech??dzaj??ciMesiac = "Povinn?? pole!";
      }

      if (!values.b??vanieOd) {
        errors.b??vanieOd= "Povinn?? pole!";
      }
      if (!values.rodn??????slo) {
        errors.rodn??????slo= "Povinn?? pole!";
      }

      if (!values.vzdelanie) {
        errors.vzdelanie = "Vyberte jednu z mo??nost??!";
      }

      if (!values.zamestnanie) {
        errors.zamestnanie = "Vyberte jednu z mo??nost??!";
      }
      if (!values.rodinn??stav) {
        errors.rodinn??stav = "Vyberte jednu z mo??nost??!";
      }

      if (!values.priezviskoMatky) {
        errors.priezviskoMatky = "Povinn?? pole!";
      }

      if (!values.email) {
        errors.email = "Povinn?? pole!";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'invalid email format';
      }
      if (!values.mobil) {
        errors.mobil = "Povinn?? pole!";
      }
      if (!values.????sloOP) {
        errors.????sloOP = "Povinn?? pole!";
      }
      if (!values.file) {
        errors.file = "Nahrajte ob??iansk?? preukaz!";
      }
      if (values.suhlas===false) {
        errors.suhlas = "Bez tohto s??hlasu, nem????te odosla?? formul??r";
      }
      if (values.file===1) {
        errors.file = "Pr??li?? ve??k?? s??bor!";
      }
      if (!values.file1) {
        errors.file1 = "Nahrajte ob??iansk?? preukaz!";
      }
      if (values.file1===1) {
        errors.file1 = "Pr??li?? ve??k?? s??bor!";
      }

      if (values.file234===1) {
        errors.file234 = "Pr??li?? ve??k?? s??bor!";
      }
      if (values.file234===3) {
        errors.file234 = "Nahrajte maxim??lne 3 s??bory!";
      }*/

      return errors;
    },
  });
  useEffect(()=>{
    setIsValidate(formik.isValid)
    console.log(formik.isValid,"use efeeects")
  },[formik.isValid])
  useEffect(()=>{
    showIfEmploy()

  },[formik.values.zamestnanie])
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*const fileInputRef = useRef(null);
const onFileInputChange = (event) => {
  const { files } = event.target;
 console.log(files[0])
 const reader = new FileReader();
 reader.readAsDataURL(files[0]);
 reader.onload = function (e) {
console.log(e.target.result);
  };

}
const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };

const onTargetClick = () => {
  fileInputRef.current.click()
}*/
const NoDropzoneLayout = ({
    previews,
    submitButton,
    input,
    files,
    dropzoneProps,
    name,
  }) => {
    const { ref, className, style } = dropzoneProps;

    return (
      <div ref={ref} className={className} style={style}>
        {previews}
        {input}

        {files.length > 0 && submitButton}
      </div>
    );
  };
  const styles = {
    control: (base, state) => ({
      ...base,
      border: '2px solid black',
      borderRadius: '0.5em',
      boxShadow: 'none',
      fontSize:14,
      '&:hover': {
          border: '2px solid black',
      }
  })
  };
  const popwindow = () => {
    window.open("osobne.html","","height=200,width=400,scrollbars=no")
  }

  const handleChangeStatus = (file, allFiles, files) => {
    document.getElementById("fileData0").value = "";
      document.getElementById("mimeType0").value = "";
      document.getElementById("fileName0").value = "";
      formik.setFieldTouched('file',true)
      formik.setFieldValue('file','')
    if(files[0].file.size > 15728640){
      formik.setFieldValue('file',1)
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0].file);
    reader.onload = function (e) {
      console.log(e.target.result)
      let fileData = e.target.result.substr(e.target.result.indexOf(",")+1);
      let mimeTypeStart = e.target.result.indexOf("data:") + 5;
      let mimeTypeEnd = e.target.result.indexOf(";");
      let mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
      let fileName = files[0].file.name;
      document.getElementById("fileData0").value = fileData;
      document.getElementById("mimeType0").value = mimeType;
      document.getElementById("fileName0").value = fileName;
      formik.setFieldValue('file',2)
    };
  };

  const handleChangeStatus1 = (file, allFiles, files) => {
    document.getElementById("fileData1").value = "";
      document.getElementById("mimeType1").value = "";
      document.getElementById("fileName1").value = "";
      formik.setFieldTouched('file1',true)
      formik.setFieldValue('file1','')
    if(files[0].file.size > 15728640){
      formik.setFieldValue('file1',1)
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0].file);
    reader.onload = function (e) {
      console.log(e.target.result)
      let fileData = e.target.result.substr(e.target.result.indexOf(",")+1);
      let mimeTypeStart = e.target.result.indexOf("data:") + 5;
      let mimeTypeEnd = e.target.result.indexOf(";");
      let mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
      let fileName = files[0].file.name;
      document.getElementById("fileData1").value = fileData;
      document.getElementById("mimeType1").value = mimeType;
      document.getElementById("fileName1").value = fileName;
      formik.setFieldValue('file1',2)
    };
  };
  const handleChangeStatus234 = (file, allFiles, files) => {
    if(files.length>=4){
      formik.setFieldTouched('file234',true)
      formik.setFieldValue('file234',3)
      return
    }
    for(let i =2;i<5;i++){
      document.getElementById("fileData"+i).value = "";
      document.getElementById("mimeType"+i).value = "";
      document.getElementById("fileName"+i).value = "";
    }
    formik.setFieldTouched('file234',true)
      formik.setFieldValue('file234','')
      for(let i =0;i<files.length;i++){
        console.log(files.length)
      if(files[i].file.size > 15728640){
        formik.setFieldValue('file234',1)
        return
      }
    }
      for(let i =2;i<files.length+2;i++){
        console.log(files[i-2])
      const reader = new FileReader();
      reader.readAsDataURL(files[i-2].file);
      reader.onload = function (e) {
        console.log(e.target.result)
        let fileData = e.target.result.substr(e.target.result.indexOf(",")+1);
        let mimeTypeStart = e.target.result.indexOf("data:") + 5;
        let mimeTypeEnd = e.target.result.indexOf(";");
        let mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
        let fileName = files[i-2].file.name;
        document.getElementById("fileData"+i).value = fileData;
        document.getElementById("mimeType"+i).value = mimeType;
        document.getElementById("fileName"+i).value = fileName;
      }
        formik.setFieldValue('file234',2)
      };

  };

// Select options for input

  const optionsZamestnanie = [
    { value: 'Zamestnanec na SK', label: 'Zamestnanec na SK' },
    { value: 'Zamestnanec v zahrani????', label: 'Zamestnanec v zahrani????' },
    { value: 'Starobn?? d??chodca', label: 'Starobn?? d??chodca' },
    { value: 'Invalidn?? d??chodca', label: 'Invalidn?? d??chodca' },
    { value: 'Opatrovate?? ??ivnostn??k EU', label: 'Opatrovate?? ??ivnostn??k EU' },
    { value: '??ivnostn??k na SK', label: '??ivnostn??k na SK (podnikate??)' },
  ]
  const optionsRodinn??stav= [
    { value: 'Slobodn??/Slobodn??', label: 'Slobodn??/Slobodn??' },
    { value: '??enat??/Vydat??', label: '??enat??/Vydat??' },
    { value: 'Rozveden??/Rozveden??', label: 'Rozveden??/Rozveden??' },
    { value: 'Vdovec/Vdova', label: 'Vdovec/Vdova' },
    { value: 'Druh/Dru??ka', label: 'Druh/Dru??ka' },
  ]
  const optionsVzdelanie= [
    { value: 'Z??kladn??', label: 'Z??kladn??' },
    { value: 'Stredo??kolsk?? s maturitou', label: 'Stredo??kolsk?? s maturitou' },
    { value: 'Stredo??kolsk?? bez maturity', label: 'Stredo??kolsk?? bez maturity' },
    { value: 'Vysoko??kolsk?? bakal??rske', label: 'Vysoko??kolsk?? bakal??rske' },
    { value: 'Vysoko??kolsk??', label: 'Vysoko??kolsk??' },
  ]
  const optionsTypB??vania= [
    { value: 'Vlastn?? byt/dom', label: 'Vlastn?? byt/dom' },
    { value: 'Dru??stevn?? byt', label: 'Dru??stevn?? byt' },
    { value: 'B??vanie u rodi??ov/u det??', label: 'B??vanie u rodi??ov/u det??' },
    { value: 'Najomn?? b??vanie' , label: 'Najomn?? b??vanie' },
    { value: 'In??' , label: 'In??' },
  ]
  const optionsPr??jemNa????et= [
    { value: '??no', label: '??no' },
    { value: 'Nie', label: 'Nie' },
  ]

  const showPrechodneByvanie = () =>{
    let dorucovaciaAdresa = document.querySelector(".dorucovacia-adresa");
    let dorucovaciaAdresa = document.querySelector(".dorucovacia-adresa");

    if (prechodneByvanie === false){
    setPrechodneByvanie(true)
    dorucovaciaAdresa.style.display = "block";
  }
  else{
    setPrechodneByvanie(false);
    dorucovaciaAdresa.style.display = "none";
  }
  console.log(prechodneByvanie)
}
const suhlas = () =>{
  formik.setFieldTouched("suhlas",true)
if (suhlasOU===false){
  setSuhlasOU(true)
  formik.setFieldValue("suhlas",true)

}
else{
  setSuhlasOU(false)
  formik.setFieldValue("suhlas",false)
}
}
const showIfEmploy = () =>{
  let showifemploy = document.querySelector(".if-employ-section");
  let nameshowifemploy = document.querySelector(".section-name-zamestnanie");

  if (formik.values.zamestnanie === "Zamestnanec na SK"||formik.values.zamestnanie === "Zamestnanec v zahrani????"||formik.values.zamestnanie === "Opatrovate?? ??ivnostn??k EU"||formik.values.zamestnanie === "??ivnostn??k na SK"){
  showifemploy.style.display = "flex";
  nameshowifemploy.style.display= "block";
}
else{
  showifemploy.style.display = "none";
  nameshowifemploy.style.display= "none"

}
}
const validate = () =>{
  if (isValidate===true){
    let finalErros = document.querySelector(".error-final");
    finalErros.style.display = "none";
  }
  else{
    let finalErros = document.querySelector(".error-final");
  finalErros.style.display = "block";
  }

  /*if(formik.isValid===false || isValidate===false){
    console.log(formik.errors)
    formik.setFieldValue("isfinalErrorsEmpty",false)

  }*/
}

  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)

    fetch(scriptUrl, {
    method: 'POST',
    body: new FormData(formRef.current),

}).then(res => {
        console.log("SUCCESSFULLY SUBMITTED")
        setLoading(false)
    })
    .catch(err => console.log(err))
}

  const changesuma = (e) => {
    let urk_sdz = 0.1834;
    if (e.target.name === "suma") {
      let urk_sdz = 0.1834;
      if (formik.values.doba === 1) urk_sdz = 0.391;
      if (formik.values.doba > 1 && formik.values.doba < 6)
        urk_sdz = 0.2098; //0.22;
      if (formik.values.doba > 5 && formik.values.doba < 9)
        urk_sdz = 0.1834;
      let finalsuma =
        Math.round(
          PMT(
            Math.pow(1 + urk_sdz, 1 / 12) - 1,
            formik.values.doba * 12,
            -1 * e.target.value
          ) * 100
        ) / 100;
      setMounthsuma(finalsuma);
    }

    if (e.target.name === "doba") {
      if (e.target.value === 1) urk_sdz = 0.391;
      if (e.target.value > 1 && e.target.value < 6) urk_sdz = 0.2098; //0.22;
      if (e.target.value > 5 && e.target.value < 9) urk_sdz = 0.1834;
      let finalsuma =
        Math.round(
          PMT(
            Math.pow(1 + urk_sdz, 1 / 12) - 1,
            e.target.value * 12,
            -1 * formik.values.suma
          ) * 100
        ) / 100;
      setMounthsuma(finalsuma);
    }
  };
  return (
    <>
      <h1 className="header-form">
        Vypl??te formul??r pre nez??v??znu ??iados?? o p????i??ku.
      </h1>
      <div className="input-file-field-text-upload">
      P????i??ku nevieme schv??li??, ak m??te z??znam v registri exek??ci?? a dl??n??kov.
</div>
      <form onSubmit={formik.handleSubmit} ref={formRef} name="google-sheet">
        <div className="container-form">
          <div className="section-name">Vyberte po??adovan?? sumu</div>
          <h2>{formik.values.suma}</h2>
          <div className="containerslider">
            <div className="pullleft" >
              500???
            </div>
            <div className="pullright" >
              15 000???
            </div>
            <input
              type="range"
              name="suma"
              step="100"
              min="500"
              max="15000"
              onChange={(e) => {
                formik.handleChange(e);
                changesuma(e);
              }}
              value={formik.values.suma}
              className="slider"
              id="suma"
            />
            <div className="pullleft" style={{ fontSize: "1rem" }}>
              min.
            </div>
            <div className="pullright" style={{ fontSize: "1rem" }}>
              max.
            </div>
          </div>

          <div className="section-name">Vyberte dobu spl??cania</div>
          <h2>{formik.values.doba}</h2>
          <div className="containerslider">
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              1 rok
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              8 rokov
            </div>
            <input
              type="range"
              name="doba"
              step="1"
              min="1"
              max="8"
              onChange={(e) => {
                formik.handleChange(e);
                changesuma(e);
              }}
              value={formik.values.doba}
              className="slider"
              id="doba"
            />
            <div className="pullleft" style={{ fontSize: "1rem" }}>
              min.
            </div>
            <div className="pullright" style={{ fontSize: "1rem" }}>
              max.
            </div>
          </div>
          <div className="info">Priemern?? hodnota RPNM od 9,12%</div>
          <h2> Mesa??n?? spl??tka: {mounthsuma}???</h2>
          <div className="info2">
            V????ka spl??tky je len orienta??n?? bude vypo????tan?? na z??klade Va??ich
            individu??lnych podmienok
          </div>
        </div>
        <div className="section-name">Z??kladn?? inform??cie</div>

        <div className="personal-data">
          <div className="personal-data-field">
            <label htmlFor="name">Meno a priezvisko:</label>
            <input
              type="text"
              name="meno"
              id="meno"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.meno}
            />
            <div className="errors">
            {formik.errors.meno && formik.touched.meno ? <div>{formik.errors.meno}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="priezviskoMatky">Rodn?? priezvisko matky:</label>
            <input
              type="text"
              name="priezviskoMatky"
              id="priezviskoMatky"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priezviskoMatky}
            />
          <div className="errors">
            {formik.errors.priezviskoMatky && formik.touched.priezviskoMatky ? <div>{formik.errors.priezviskoMatky}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="rodn??????slo">Rodn?? ????slo:</label>
            <input
              type="text"
              name="rodn??????slo"
              id="rodn??????slo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rodn??????slo}
            />
            <div className="errors">
            {formik.errors.rodn??????slo && formik.touched.rodn??????slo ? <div>{formik.errors.rodn??????slo}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
            <label htmlFor="????sloOP">????slo ob??iansk??ho preukazu:</label>
            <input
              type="text"
              name="????sloOP"
              id="????sloOP"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.????sloOP}
            />
            <div className="errors">
            {formik.errors.????sloOP && formik.touched.????sloOP ? <div>{formik.errors.????sloOP}</div> : null}
            </div>
            </div>
          <div className="personal-data-field">
          <label htmlFor="rodinn??stav">Rodinn?? stav:</label>
          <Select styles={styles} options={optionsRodinn??stav} placeholder="" name="rodinn??stav" id="rodinn??stav" onChange={e => {formik.setFieldValue("rodinn??stav",e.value);formik.setFieldTouched('rodinn??stav',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.rodinn??stav && formik.touched.rodinn??stav ? <div>{formik.errors.rodinn??stav}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="vzdelanie">Vzdelanie:</label>
          <Select styles={styles} options={optionsVzdelanie} placeholder="" name="vzdelanie" id="vzdelanie" onChange={e => {formik.setFieldValue("vzdelanie",e.value);formik.setFieldTouched('vzdelanie',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.vzdelanie && formik.touched.vzdelanie ? <div>{formik.errors.vzdelanie}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="zamestnanie">Va??e zamestnanie:</label>
          <Select styles={styles} options={optionsZamestnanie} placeholder="" name="zamestnanie" id="zamestnanie" onChange={e => {formik.setFieldValue("zamestnanie",e.value);formik.setFieldTouched('zamestnanie',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.zamestnanie && formik.touched.zamestnanie ? <div>{formik.errors.zamestnanie}</div> : null}
            </div>
          </div>
        </div>
        <div className="section-name-zamestnanie">Zamestanie</div>
        <div className="if-employ-section">
        <div className="if-employ">
          <label htmlFor="n??zovZamestn??vate??a">N??zov zamestn??vate??a:</label>
          <input
              type="text"
              name="n??zovZamestn??vate??a"
              id="n??zovZamestn??vate??a"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.n??zovZamestn??vate??a}
            />
            <div className="errors">
            {formik.errors.n??zovZamestn??vate??a && formik.touched.n??zovZamestn??vate??a ? <div>{formik.errors.n??zovZamestn??vate??a}</div> : null}
            </div>
            </div>
            <div className="if-employ">
          <label htmlFor="I??Ozamestn??vate??a">I??O zamestn??vate??a:</label>
          <input
              type="text"
              name="I??Ozamestn??vate??a"
              id="I??Ozamestn??vate??a"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.I??Ozamestn??vate??a}
            />
            <div className="errors">
            {formik.errors.I??Ozamestn??vate??a && formik.touched.I??Ozamestn??vate??a ? <div>{formik.errors.I??Ozamestn??vate??a}</div> : null}
            </div>
            </div>
            <div className="if-employ">
          <label htmlFor="d??tumDoZamestnania">D??tum n??stupu do zamestnania:</label>
          <input
              type="date"
              name="d??tumDoZamestnania"
              id="d??tumDoZamestnania"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.d??tumDoZamestnania}
            />
            <div className="errors">
            {formik.errors.d??tumDoZamestnania && formik.touched.d??tumDoZamestnania ? <div>{formik.errors.d??tumDoZamestnania}</div> : null}
            </div>
            </div>
            </div>
            <div className="section-name">Trval?? bydlisko</div>

        <div className="personal-data">
          {/*
          <div className="personal-data-field">
            <label htmlFor=""></label>
            <input
              type="text"
              name=""
              id=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.}
            />
            <div className="errors">
            {formik.errors. && formik.touched. ? <div>{formik.errors.}</div> : null}
            </div>
            </div>*/}
            <div className="personal-data-field">
            <label htmlFor="adresa">Adresa:</label>
            <input
              type="text"
              name="adresa"
              id="adresa"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.adresa}
            />
            <div className="errors">
            {formik.errors.adresa && formik.touched.adresa ? <div>{formik.errors.adresa}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="obecaPs??">Obec a PS??:</label>
            <input
              type="text"
              name="obecaPs??"
              id="obecaPs??"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPs??}
            />
            <div className="errors">
            {formik.errors.obecaPs?? && formik.touched.obecaPs?? ? <div>{formik.errors.obecaPs??}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
          <label htmlFor="typB??vania">Typ b??vania:</label>
          <Select styles={styles} options={optionsTypB??vania} placeholder="" name="typB??vania" id="typB??vania" onChange={e => {formik.setFieldValue("typB??vania",e.value);formik.setFieldTouched('typB??vania',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.typB??vania && formik.touched.typB??vania ? <div>{formik.errors.typB??vania}</div> : null}
            </div>
          </div>
            <div className="personal-data-field">
            <label htmlFor="b??vanieOd">Na adrese b??vam od:</label>
            <input
              type="text"
              name="b??vanieOd"
              id="b??vanieOd"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.b??vanieOd}
            />
            <div className="errors">
            {formik.errors.b??vanieOd && formik.touched.b??vanieOd ? <div>{formik.errors.b??vanieOd}</div> : null}
            </div>
            </div>

        </div>
        <div className="section-name-doruc">Doru??ovacia adresa</div>

        <div className="prechodne-bydlisko-field">
            <input type="checkbox" onChange={showPrechodneByvanie}/>
            Chcem doru??ova?? po??tu na in?? adresu.
        </div>
        <div className="dorucovacia-adresa">
          <div className="personal-data-field">
            <label htmlFor="adresaDorucovacia">Adresa:</label>
            <input
              type="text"
              name="adresaDorucovacia"
              id="adresaDorucovacia"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.adresaDorucovacia}
            />
            <div className="errors">
            {formik.errors.adresaDorucovacia && formik.touched.adresaDorucovacia ? <div>{formik.errors.adresaDorucovacia}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="obecaPs??Dorucovacia">Obec a PS??:</label>
            <input
              type="text"
              name="obecaPs??Dorucovacia"
              id="obecaPs??Dorucovacia"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPs??Dorucovacia}
            />
            <div className="errors">
            {formik.errors.obecaPs??Dorucovacia && formik.touched.obecaPs??Dorucovacia ? <div>{formik.errors.obecaPs??Dorucovacia}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
          <label htmlFor="typB??vaniaDorucovacia">Typ b??vania:</label>
          <Select styles={styles} options={optionsTypB??vania} placeholder="" name="typB??vania" id="typB??vania" onChange={e => {formik.setFieldValue("typB??vaniDorucovaciaa",e.value);formik.setFieldTouched('typB??vania',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.typB??vaniaDorucovacia && formik.touched.typB??vaniaDorucovacia ? <div>{formik.errors.typB??vaniaDorucovacia}</div> : null}
            </div>
          </div>
            <div className="personal-data-field">
            <label htmlFor="b??vanieOdDorucovacia">Na adrese b??vam od:</label>
            <input
              type="text"
              name="b??vanieOdDorucovacia"
              id="b??vanieOdDorucovacia"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.b??vanieOdDorucovacia}
            />
            <div className="errors">
            {formik.errors.b??vanieOdDorucovacia && formik.touched.b??vanieOdDorucovacia ? <div>{formik.errors.b??vanieOdDorucovacia}</div> : null}
            </div>
            </div>
            </div>
            <div className="section-name">Kontaktn?? ??daje</div>

            <div className="personal-data">
          <div className="personal-data-field">
            <label htmlFor="mobil">Mobil:</label>
            <input
              type="text"
              name="mobil"
              id="mobil"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.mobil}
            />
            <div className="errors">
            {formik.errors.mobil && formik.touched.mobil ? <div>{formik.errors.mobil}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="errors">
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            </div>
            </div>
            </div>
            <div className="section-name-prijem">??ist?? mesa??n?? pr??jem <div className="no-wrap">za posledn?? 3 mesiace</div></div>

            <div className="personal-data">
           <div className="personal-data-field">
            <label htmlFor="tentoMesiac">Tento mesiac:</label>
            <input
              type="text"
              name="tentoMesiac"
              id="tentoMesiac"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tentoMesiac}
            />
            <div className="errors">
            {formik.errors.tentoMesiac && formik.touched.tentoMesiac ? <div>{formik.errors.tentoMesiac}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
            <label htmlFor="prech??dzaj??ciMesiac">Predch??dzaj??ci mesiac:</label>
            <input
              type="text"
              name="prech??dzaj??ciMesiac"
              id="prech??dzaj??ciMesiac"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.prech??dzaj??ciMesiac}
            />
            <div className="errors">
            {formik.errors.prech??dzaj??ciMesiac && formik.touched.prech??dzaj??ciMesiac ? <div>{formik.errors.prech??dzaj??ciMesiac}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
            <label htmlFor="predPrech??dzaj??ciMesiac">Predpredch??zaj??ci mesiac:</label>
            <input
              type="text"
              name="predPrech??dzaj??ciMesiac"
              id="predPrech??dzaj??ciMesiac"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.predPrech??dzaj??ciMesiac}
            />
            <div className="errors">
            {formik.errors.predPrech??dzaj??ciMesiac && formik.touched.predPrech??dzaj??ciMesiac ? <div>{formik.errors.predPrech??dzaj??ciMesiac}</div> : null}
            </div>
            </div>
            </div>
            <div className="section-name">Bankov?? spojenie</div>

            <div className="personal-data">
          <div className="personal-data-field">
            <label htmlFor="IBAN">IBAN (????et, kde chcete ??erpa?? p????i??ku):</label>
            <input
              type="text"
              name="IBAN"
              id="IBAN"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.IBAN}
            />
            <div className="errors">
            {formik.errors.IBAN && formik.touched.IBAN ? <div>{formik.errors.IBAN}</div> : null}
            </div>
            </div>
            </div>
        <div className="files-container">
        <div className="section-name">K??pia ob??iansk??ho preukazu</div>
        <div className="input-file-field-text">
            Ob??iansky preukaz z oboch str??n, ??itate??n??, v plnej kvalite bez ch??baj??cich rohov a rozmazan??ho p??sma - ide??lne foti?? na bielom podklade.
            </div>
        <div className="input-file-field-name">
            Predn?? strana
            </div>
            <div className="input-file-field-text-upload">
Nahrajte max. 1 s??bor. (Obr??zok alebo PDF)
</div>
          <div className="input-file-field">
            <Dropzone
              LayoutComponent={NoDropzoneLayout}
              multiple={false}
              styles={{
                inputLabelWithFiles: { display: "none" },
                previewImage: { maxHeight: 200, maxWidth: 200, marginLeft: 20,  },
                dropzone: { borderWidth:2, borderColor:'black', borderRadius: 5},
                inputLabel: {color: '#021391'}}}
              onChangeStatus={handleChangeStatus}
              inputContent="Vybra?? s??bor"
              accept="image/*,.pdf"
              maxFiles={1}
              maxSizeBytes={15728640}
              />
              <div className="error-file-size">
              {formik.errors.file && formik.touched.file ? <div>{formik.errors.file}</div> : null}
            </div>
          </div>
          <div className="input-file-field-name">
            Zadn?? strana
            </div>
            <div className="input-file-field-text-upload">
Nahrajte max. 1 s??bor. (Obr??zok alebo PDF)
</div>
            <div className="input-file-field">
            <Dropzone
              LayoutComponent={NoDropzoneLayout}
              multiple={false}
              styles={{
                inputLabelWithFiles: { display: "none" },
                previewImage: { maxHeight: 200, maxWidth: 200, marginLeft: 20,  },
                dropzone: { borderWidth:2, borderColor:'black', borderRadius: 5},
                inputLabel: {color: '#021391'}}}
              onChangeStatus={handleChangeStatus1}
              inputContent="Vybra?? s??bor"
              accept="image/*,.pdf"
              maxFiles={1}
              maxSizeBytes={15728640}
              />
              <div className="error-file-size">
              {formik.errors.file1 && formik.touched.file1 ? <div>{formik.errors.file1}</div> : null}
            </div>
          </div>
        </div>
        <div className="files-container">
        <div className="section-name">V??pis z ????tu</div>
        <div className="input-file-field-text">
        V??pis z ????tu za predch??dzaj??ci mesiac v plnej kvalite a plnom rozsahu str??n.
        Akceptujeme k??piu v??pisu z ????tu, stiahnut?? z internet bankingu, alebo oskenovan??, pr??padne kvalitne odfoten?? k??piu.
        V pr??pade ak nie ste majite??om ????tu je potrebn?? dolo??i?? dispozi??n?? pr??vu k ????tu.
           </div>
           <div className="input-file-field-name-nepovinne">
            V??pis z ????tu
            </div>
           <div className="input-file-field-text-upload">
Nahrajte max. 3 s??bory. (Najvhodnej??ie 1-2 PDF s??bory.)
</div>
          <div className="input-file-field">
            <Dropzone
              LayoutComponent={NoDropzoneLayout}
              multiple={true}
              styles={{
                previewImage: { maxHeight: 100, maxWidth: 100, marginLeft: 20,  },
                dropzone: { borderWidth:2, borderColor:'black', borderRadius: 5},
                inputLabel: {color: '#021391'}}}
              onChangeStatus={handleChangeStatus234}
              inputContent="Vybra?? s??bory"
              accept="image/*,.pdf"
              maxSizeBytes={15728640}
              maxFiles={4}
              inputWithFilesContent={"Prida?? s??bory"}
              />
              <div className="error-file-size">
              {formik.errors.file234 && formik.touched.file234 ? <div>{formik.errors.file234}</div> : null}
            </div>
          </div>
          <div className="prechodne-bydlisko-field-suhlas-error">
            <input type="checkbox" onChange={suhlas}/>
            S??hlas??m so spracovan??m <a className="suhlasim" onClick={handleOpen}>osobn??ch ??dajov.</a>
        </div>
        <div className="error-file-size">
              {formik.errors.suhlas && formik.touched.suhlas ? <div>{formik.errors.suhlas}</div> : null}
            </div>
        </div>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Box sx={style2}>

    <div className="name-modal">
      Spracovanie osobn??ch ??dajov
    </div>
    <FontAwesomeIcon onClick={handleClose} className="icona" icon="fa-solid fa-x" />

    </Box>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Vy????ie uveden?? osobn?? ??daje vyplnen??m a zaslan??m tohto formul??ra poskytujete na??ej spolo??nosti ??? Zinc Euro, a.s. so s??dlom Karpatsk?? 3256/15, 058 01 Poprad , I??O: 47918551, DI??: 2024151833, I?? DPH: SK2024151833, ako sprostredkovate??ovi pod??a z??kona ??. 186/2009 Z. z. o finan??nom sprostredkovan?? a finan??nom poradenstve, ktor?? je dr??ite??om povolenia N??rodnej banky Slovenska na v??kon ??innosti viazan??ho finan??n??ho agenta, Reg. ????slo NBS: 242137 a je zap??san?? v podregistri poskytovania ??verov, ??verov na b??vanie a spotrebite??sk??ch ??verov odo d??a 13.12.2018 (??alej aj len ako ???viazan?? finan??n?? agent???), a ktor?? je tie?? s????asne sprostredkovate??om osobn??ch ??dajov (t. j. sprac??va osobn?? ??daje v mene prev??dzkovate??a) pod??a ??l. 28 Nariadenia EP a Rady (E??) 2016/679 z 27. apr??la 2016 (GDPR) a to pre prev??dzkovate??a ??? spolo??nos?? Amico Finance a. s. so s??dlom Dvo????kovo n??bre??ie 4, 811 02 Bratislava, I??O: 48 113 671, zap??san?? v obchodnom registri Okresn??ho s??du Bratislava I, odd. Sa, vl. ??. 6128/B ako poskytovate??a spotrebite??sk??ch ??verov (??alej len Amico Finance, a. s.). Na??a spolo??nos?? sprac??va osobn?? ??daje ako prev??dzkovate?? iba v rozsahu nevyhnutnom na plnenie jej povinnost?? a v??kon pr??v finan??n??ho agenta v s??lade so z??konom ??. 186/2009 Z. z.

??daje, ktor?? uvediete v tomto formul??ri, bud?? zo strany prev??dzkovate??a ??? spolo??nosti Amico Finance a. s. sprac??van?? za ????elom zistenia a overenia toto??nosti klienta a plnenia iny??ch povinnost?? pod??a z??kona ??. 297/2008 Z. z. o ochrane pred legaliz??ciou pr??jmov z trestnej ??innosti a o ochrane pred financovan??m terorizmu, posudzovania ??iadosti o poskytnutie spotrebite??sk??ho ??veru, vr??tane posudzovania schopnosti klienta spl??ca?? spl??tky spotrebite??sk??ho ??veru a za ????elom uzatv??rania, plnenia a spr??vy zmluvy o spotrebite??skom ??vere/inom ??vere a splnenia si z??konn??ch povinnost?? prev??dzkovate??a v s??vislosti s informovan??m klienta pri poskytovan?? spotrebite??sk??ho ??veru.

Podrobnosti o spracovan?? osobn??ch ??dajov zo strany spolo??nosti Amico Finance a. s., ktor?? z??rove?? sprac??va na??a spolo??nos?? ako sprostredkovate?? pod??a ??l. 28 GDPR, ako aj o Va??ich
pr??vach s t??m s??visiacich n??jdete na internetovej str??nke prev??dzkovate??a https://www.ahojsplatky.sk/ochrana-osobnych-udajov.

Na??a spolo??nos?? Zinc Euro, a.s.  vykon??va finan??n?? sprostredkovanie na z??klade p??somnej zmluvy s jednou finan??nou in??tit??ciou a to spolo??nos??ou Amico Finance a. s. T??to zmluva m?? v??hradn?? povahu. Bli????ie inform??cie o finan??nom sprostredkovan?? V??m bud?? poskytnut?? p??somne prostredn??ctvom formul??ra a s????asne na webe https://www.zinceuro.sk/informacie-o-financnom-sprostredkovani.
    </Typography>
  </Box>
</Modal>
<Modal
  open={loading}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style3}>
  <div className="spinner"></div>

    <div className="name-modalis">
      Po??kajte pros??m na tejto str??nke, ??daje sa odosielaju.
    </div>



  </Box>
</Modal>
        <input
              type="hidden"
              name="fileData0"
              id="fileData0"
            />
            <input
              type="hidden"
              name="fileName0"
              id="fileName0"
            />
            <input
              type="hidden"
              name="mimeType0"
              id="mimeType0"
            />

             <input
              type="hidden"
              name="fileData1"
              id="fileData1"
            />
            <input
              type="hidden"
              name="fileName1"
              id="fileName1"
            />
            <input
              type="hidden"
              name="mimeType1"
              id="mimeType1"
            />

                <input
              type="hidden"
              name="fileData2"
              id="fileData2"
            />
            <input
              type="hidden"
              name="fileName2"
              id="fileName2"
            />
            <input
              type="hidden"
              name="mimeType2"
              id="mimeType2"
            />

             <input
              type="hidden"
              name="fileData3"
              id="fileData3"
            />
            <input
              type="hidden"
              name="fileName3"
              id="fileName3"
            />
            <input
              type="hidden"
              name="mimeType3"
              id="mimeType3"
            />
             <input
              type="hidden"
              name="fileData4"
              id="fileData4"
            />
            <input
              type="hidden"
              name="fileName4"
              id="fileName4"
            />
            <input
              type="hidden"
              name="mimeType4"
              id="mimeType4"
            />
            <div className="error-final">
                Skontrolujte povinn?? ??daje alebo spr??vnos??.
  </div>
<div className="submit-button">
      <button type="submit" onClick={()=>validate()} className="button">Odosla?? nez??v??znu ??iados??</button>
  </div>


      </form>


    </>
  );
}
