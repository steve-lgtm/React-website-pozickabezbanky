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
    const formRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      suma: 5000,
      doba: 8,
      meno: "",
      priezviskoMatky: "",
      file: '',
      zamestnanie: "",
      familyStatus:'',



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

      if (!values.zamesnanie) {
        errors.zamesnanie = "Vyberte jednu z možností!";
      }
      if (!values.familyStatus) {
        errors.familyStatus = "Vyberte jednu z možností!";
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
      boxShadow: 'none',
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

  const optionsJob = [
    { value: 'Zamestnanec na SK', label: 'Zamestnanec na SK' },
    { value: 'Zamestnanec v zahraničí', label: 'Zamestnanec v zahraničí' },
    { value: 'Dôchodca', label: 'Dôchodca' },
    { value: 'Invalidný dôchodca', label: 'Invalidný dôchodca' },
    { value: 'Opatrovateľ živnostník EU', label: 'Opatrovateľ živnostník EU' },
    { value: 'Živnostník na SK', label: 'Živnostník na SK (podnikateľ)' },
  ]
  const optionsFamilyStatus= [
    { value: 'Slobodný/Slobodná', label: 'Slobodný/Slobodná' },
    { value: 'Ženatý/Vydatá', label: 'Ženatý/Vydatá' },
    { value: 'Rozvedený/Rozvedená', label: 'Rozvedený/Rozvedená' },
    { value: 'Vdovec/Vdova', label: 'Vdovec/Vdova' },
    { value: 'Druh/Družka', label: 'Druh/Družka' },
  ]


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
          <label htmlFor="zamesnanie">Vaše zamestnanie:</label>
          <Select styles={styles} options={optionsJob} placeholder="" name="zamesnanie" id="zamesnanie" onChange={e => {formik.setFieldValue("zamesnanie",e.value);formik.setFieldTouched('zamesnanie',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.zamesnanie && formik.touched.zamesnanie ? <div>{formik.errors.zamesnanie}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="familyStatus">Rodinný stav:</label>
          <Select styles={styles} options={optionsFamilyStatus} placeholder="" name="familyStatus" id="familyStatus" onChange={e => {formik.setFieldValue("familyStatus",e.value);formik.setFieldTouched('familyStatus',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.familyStatus && formik.touched.familyStatus ? <div>{formik.errors.familyStatus}</div> : null}
            </div>
          </div>
          <div className="personal-data-field">
          <label htmlFor="education">Vzdelanie:</label>
          <Select styles={styles} options={optionsFamilyStatus} placeholder="" name="familyStatus" id="familyStatus" onChange={e => {formik.setFieldValue("familyStatus",e.value);formik.setFieldTouched('familyStatus',false)}} isSearchable={false} />
          <div className="errors">
            {formik.errors.familyStatus && formik.touched.familyStatus ? <div>{formik.errors.familyStatus}</div> : null}
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
                dropzone: { borderWidth:2, borderColor:'black'  }
              }}
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
