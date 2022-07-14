import React from "react";
import "../../App.css";
import "./Ziadost.css";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

function PMT(ir, np, pv, fv, type) {
  //  * ir   - interest rate per month
  //  * np   - number of periods (months)
  // * pv   - present value
  // * fv   - future value
  //  * type - when the payments are due:
  //   *        0: end of the period, e.g. end of month (default)
  //  *        1: beginning of period

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
  const [mounthAmount, setMounthAmount] = useState(95.48);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbz6x22p_B1vPYMDfw3d_pbbimvJUfjGTSJSXXaQMWSu6GbaftZ38FarzmDzdLVGz82HqQ/exec"
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      amount: 5000,
      period: 8,
      name: "",
      surnameMom: ""
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

      if (!values.name) {
        errors.name = "Requiered";
      }

      if (!values.surnameMom) {
        errors.surnameMom = "Requiered";
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

  const handleChangeStatus = (file, allFiles, files) => {
    document.getElementById("fileData0").value = "";
      document.getElementById("mimeType0").value = "";
      document.getElementById("fileName0").value = "";
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
    };
  };

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

  const changeAmount = (e) => {
    let urk_sdz = 0.1834;
    if (e.target.name === "amount") {
      let urk_sdz = 0.1834;
      if (formik.values.period === 1) urk_sdz = 0.391;
      if (formik.values.period > 1 && formik.values.period < 6)
        urk_sdz = 0.2098; //0.22;
      if (formik.values.period > 5 && formik.values.period < 9)
        urk_sdz = 0.1834;
      let finalAmount =
        Math.round(
          PMT(
            Math.pow(1 + urk_sdz, 1 / 12) - 1,
            formik.values.period * 12,
            -1 * e.target.value
          ) * 100
        ) / 100;
      setMounthAmount(finalAmount);
    }

    if (e.target.name === "period") {
      if (e.target.value === 1) urk_sdz = 0.391;
      if (e.target.value > 1 && e.target.value < 6) urk_sdz = 0.2098; //0.22;
      if (e.target.value > 5 && e.target.value < 9) urk_sdz = 0.1834;
      let finalAmount =
        Math.round(
          PMT(
            Math.pow(1 + urk_sdz, 1 / 12) - 1,
            e.target.value * 12,
            -1 * formik.values.amount
          ) * 100
        ) / 100;
      setMounthAmount(finalAmount);
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
          <h2>{formik.values.amount}</h2>
          <div className="containerslider">
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              500€
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              15 000€
            </div>
            <input
              type="range"
              name="amount"
              step="100"
              min="500"
              max="15000"
              onChange={(e) => {
                formik.handleChange(e);
                changeAmount(e);
              }}
              value={formik.values.amount}
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
          <h2>{formik.values.period}</h2>
          <div className="containerslider">
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              1 rok
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              8 rokov
            </div>
            <input
              type="range"
              name="period"
              step="1"
              min="1"
              max="8"
              onChange={(e) => {
                formik.handleChange(e);
                changeAmount(e);
              }}
              value={formik.values.period}
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
          <h2> Mesačná splátka: {mounthAmount}€</h2>
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
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div>
            {formik.errors.name ? </div>{formik.errors.name} : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="surnameMom">Rodné priezvisko matky:</label>
            <input
              type="text"
              name="surnameMom"
              id="surnameMom"
              onChange={formik.handleChange}
              value={formik.values.surnameMom}
            />


          </div>
          {formik.errors.surnameMom ? <div>{formik.errors.surnameMom}</div> : null}
        </div>
        <div className="files-container">
          <div className="input-file-field">
            <Dropzone
              LayoutComponent={NoDropzoneLayout}
              multiple={false}
              styles={{
                inputLabelWithFiles: { display: "none" },
                previewImage: { maxHeight: 200, maxWidth: 200, marginLeft: 20 },
              }}
              onChangeStatus={handleChangeStatus}
              inputContent="Vybrať súbory"
              accept="image/*,.pdf,video/*"
              maxFiles={1}
              maxSizeBytes={157286}
            />
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
