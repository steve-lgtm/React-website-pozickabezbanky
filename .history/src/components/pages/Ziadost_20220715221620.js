import React from "react";
import "../../App.css";
import "./Ziadost.css";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Select from 'react-select'


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

export default function Ziadost() {
  const [mounthsuma, setMounthsuma] = useState(95.48);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbz6x22p_B1vPYMDfw3d_pbbimvJUfjGTSJSXXaQMWSu6GbaftZ38FarzmDzdLVGz82HqQ/exec"
    const [loading, setLoading] = useState(false)
    const [prechodneByvanie, setPrechodneByvanie] = useState(false)
    const formRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      suma: 5000,
      doba: 8,
      meno: "",
      priezviskoMatky: "",
      file: '',
      zamestnanie: "",
      rodinnýstav:'',
      vzdelanie:'',
      adresa:'',
      obecaPsč: '',
      typBývania:'',
      bývanieOd:'',

    },
    onSubmit: (values) => {
      setLoading(true)

      fetch(scriptUrl, {
      method: 'POST',
      body: new FormData(formRef.current),

  }).then(res => {
          console.log("SUCCESSFULLY SUBMITTED")
          setLoading(false)
      })
      .catch(err => console.log(err))
    },
    validate: (values) => {
      let errors = {};

      if (!values.meno) {
        errors.meno = "Povinné pole!";
      }

      if (!values.vzdelanie) {
        errors.vzdelanie = "Vyberte jednu z možností!";
      }

      if (!values.zamestnanie) {
        errors.zamestnanie = "Vyberte jednu z možností!";
      }
      if (!values.rodinnýstav) {
        errors.rodinnýstav = "Vyberte jednu z možností!";
      }

      if (!values.priezviskoMatky) {
        errors.priezviskoMatky = "Povinné pole!";
      }

     /* if (!values.email) {
        errors.email = "Povinné pole!";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.priezviskoMatky)){
        errors.email = 'invalid email format';
      }
*/


      if (!values.file) {
        errors.file = "Nahrajte občianský preukaz!";
      }
      if (values.file===1) {
        errors.file = "Príliš veľký súbor!";
      }

      return errors;
    },
  });
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
console.log(formik.errors,"erorry")
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
  const handleChangeStatus = (file, allFiles, files) => {
    console.log(formik.values.file)
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

// Select options for input

  const optionsZamestnanie = [
    { value: 'Zamestnanec na SK', label: 'Zamestnanec na SK' },
    { value: 'Zamestnanec v zahraničí', label: 'Zamestnanec v zahraničí' },
    { value: 'Dôchodca', label: 'Dôchodca' },
    { value: 'Invalidný dôchodca', label: 'Invalidný dôchodca' },
    { value: 'Opatrovateľ živnostník EU', label: 'Opatrovateľ živnostník EU' },
    { value: 'Živnostník na SK', label: 'Živnostník na SK (podnikateľ)' },
  ]
  const optionsRodinnýstav= [
    { value: 'Slobodný/Slobodná', label: 'Slobodný/Slobodná' },
    { value: 'Ženatý/Vydatá', label: 'Ženatý/Vydatá' },
    { value: 'Rozvedený/Rozvedená', label: 'Rozvedený/Rozvedená' },
    { value: 'Vdovec/Vdova', label: 'Vdovec/Vdova' },
    { value: 'Druh/Družka', label: 'Druh/Družka' },
  ]
  const optionsVzdelanie= [
    { value: 'Základné', label: 'Základné' },
    { value: 'Stredoškolské s maturitou', label: 'Stredoškolské s maturitou' },
    { value: 'Stredoškolské bez maturity', label: 'Stredoškolské bez maturity' },
    { value: 'Vysokoškolské bakalárske', label: 'Vysokoškolské bakalárske' },
    { value: 'Vysokoškolské', label: 'Vysokoškolské' },
  ]
  const optionsTypBývania= [
    { value: 'Vlastný byt/dom', label: 'Vlastný byt/dom' },
    { value: 'Družstevný byt', label: 'Družstevný byt' },
    { value: 'Bývanie u rodičov/u detí', label: 'Bývanie u rodičov/u detí' },
    { value: 'Najomné bývanie' , label: 'Najomné bývanie' },
    { value: 'Iné' , label: 'Iné' },
  ]

  const showPrechodneByvanie = () =>{
    
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
        Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
      </h1>
      <form onSubmit={formik.handleSubmit} ref={formRef} name="google-sheet">
        <div className="container-form">
          <div className="section-name">Požadovaná suma</div>
          <h2>{formik.values.suma}</h2>
          <div className="containerslider">
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              500€
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              15 000€
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

          <div className="section-name">Doba splácania</div>
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
          <div className="info">Priemerná hodnota RPNM od 9,12%</div>
          <h2> Mesačná splátka: {mounthsuma}€</h2>
          <div className="info2">
            Výška splátky je len orientačná bude vypočítaná na základe Vašich
            individuálnych podmienok
          </div>
        </div>
        <div className="personal-data">
          <div className="section-name">Základné informácie</div>
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
            <label htmlFor="priezviskoMatky">Rodné priezvisko matky:</label>
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
          <label htmlFor="zamestnanie">Vaše zamestnanie:</label>
          <Select styles={styles} options={optionsZamestnanie} placeholder="" name="zamestnanie" id="zamestnanie" onChange={e => {formik.setFieldValue("zamestnanie",e.value);formik.setFieldTouched('zamestnanie',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.zamestnanie && formik.touched.zamestnanie ? <div>{formik.errors.zamestnanie}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="rodinnýstav">Rodinný stav:</label>
          <Select styles={styles} options={optionsRodinnýstav} placeholder="" name="rodinnýstav" id="rodinnýstav" onChange={e => {formik.setFieldValue("rodinnýstav",e.value);formik.setFieldTouched('rodinnýstav',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.rodinnýstav && formik.touched.rodinnýstav ? <div>{formik.errors.rodinnýstav}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="vzdelanie">Vzdelanie:</label>
          <Select styles={styles} options={optionsVzdelanie} placeholder="" name="vzdelanie" id="vzdelanie" onChange={e => {formik.setFieldValue("vzdelanie",e.value);formik.setFieldTouched('vzdelanie',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.vzdelanie && formik.touched.vzdelanie ? <div>{formik.errors.vzdelanie}</div> : null}
            </div>
          </div>
        </div>
        <div className="personal-data">
          <div className="section-name">Trvalé bydlisko</div>
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
            <label htmlFor="adresa">Adresa</label>
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
            <label htmlFor="obecaPsč">Obec a PSČ</label>
            <input
              type="text"
              name="obecaPsč"
              id="obecaPsč"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPsč}
            />
            <div className="errors">
            {formik.errors.obecaPsč && formik.touched.obecaPsč ? <div>{formik.errors.obecaPsč}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
          <label htmlFor="typBývania">Typ bývania:</label>
          <Select styles={styles} options={optionsTypBývania} placeholder="" name="typBývania" id="typBývania" onChange={e => {formik.setFieldValue("typBývania",e.value);formik.setFieldTouched('typBývania',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.zamestnanie && formik.touched.zamestnanie ? <div>{formik.errors.zamestnanie}</div> : null}
            </div>
          </div>
            <div className="personal-data-field">
            <label htmlFor="bývanieOd">Na adrese bývam od</label>
            <input
              type="text"
              name="bývanieOd"
              id="bývanieOd"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.bývanieOd}
            />
            <div className="errors">
            {formik.errors.bývanieOd && formik.touched.bývanieOd ? <div>{formik.errors.bývanieOd}</div> : null}
            </div>
            </div>
            <div className="prechodne-bydlisko-field">
            <input type="checkbox" onChange={showPrechodneByvanie}/>
            Chcem doručovať poštu na inú adresu.
        </div>
        </div>
        <div className="dorucovacia-adresa">
          <div className="section-name">Doručovacia adresa</div>
          <div className="personal-data-field">
            <label htmlFor="adresa">Adresa</label>
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
            <label htmlFor="obecaPsč">Obec a PSČ</label>
            <input
              type="text"
              name="obecaPsč"
              id="obecaPsč"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPsč}
            />
            <div className="errors">
            {formik.errors.obecaPsč && formik.touched.obecaPsč ? <div>{formik.errors.obecaPsč}</div> : null}
            </div>
            </div>
            <div className="personal-data-field">
          <label htmlFor="typBývania">Typ bývania:</label>
          <Select styles={styles} options={optionsTypBývania} placeholder="" name="typBývania" id="typBývania" onChange={e => {formik.setFieldValue("typBývania",e.value);formik.setFieldTouched('typBývania',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.zamestnanie && formik.touched.zamestnanie ? <div>{formik.errors.zamestnanie}</div> : null}
            </div>
          </div>
            <div className="personal-data-field">
            <label htmlFor="bývanieOd">Na adrese bývam od</label>
            <input
              type="text"
              name="bývanieOd"
              id="bývanieOd"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.bývanieOd}
            />
            <div className="errors">
            {formik.errors.bývanieOd && formik.touched.bývanieOd ? <div>{formik.errors.bývanieOd}</div> : null}
            </div>
            </div>
            </div>
        <div className="files-container">
          <div className="input-file-field">
            <Dropzone
              LayoutComponent={NoDropzoneLayout}
              multiple={false}
              styles={{
                inputLabelWithFiles: { display: "none" },
                previewImage: { maxHeight: 200, maxWidth: 200, marginLeft: 20,  },
                dropzone: { borderWidth:2, borderColor:'black', borderRadius: 5}}}
              onChangeStatus={handleChangeStatus}
              inputContent="Vybrať súbory"
              accept="image/*,.pdf,video/*"
              maxFiles={1}
              maxSizeBytes={15728640}
              />
              <div className="error-file-size">
              {formik.errors.file && formik.touched.file ? <div>{formik.errors.file}</div> : null}
            </div>
              {/* A JSX comment

          <div className="error-file-size">
            Príliš veľký súbor!
            </div>
            <div className="error-file-required">
            {formik.errors.file ? <div>{formik.errors.file}</div> : null}
            </div>

*/}
          </div>
        </div>
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
        <input type="submit" value={loading ? "Loading..." : "SEND MESSAGE"}/>
      </form>
    </>
  );
}
