import "../../App.css";
import "./Ziadost.css";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Select from "react-select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxHeight: "calc(100vh - 200px)",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "justify",
};
const style2 = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const style3 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxHeight: "calc(100vh - 200px)",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function Ziadost() {
  const [mounthsuma, setMounthsuma] = useState(95.48);
  const scriptUrl ="https://script.google.com/macros/s/AKfycbwmaaaMyUX1MVOsMl2FIZ9BczeUbUxYdgTI2GGpccD3I2k7FJsHBx0qdsayOr5719Fi_A/exec";
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [suhlasOU, setSuhlasOU] = useState(false);
  const navigate = useNavigate();

  const [prechodneByvanie, setPrechodneByvanie] = useState(false);

  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      suma: 5000,
      doba: 8,
      meno: "",
      priezviskoMatky: "",
      file: "",
      file1: "",
      file234: "",
      zamestnanie: "",
      rodinnýstav: "",
      vzdelanie: "",
      adresa: "",
      obecaPsč: "",
      typBývania: "",
      bývanieOd: "",
      adresaDorucovacia: "",
      obecaPsčDorucovacia: "",
      typBývaniaDorucovacia: "",
      bývanieOdDorucovacia: "",
      email: "",
      mobil: "",
      tentoMesiac: "",
      prechádzajúciMesiac: "",
      predPrechádzajúciMesiac: "",
      IBAN: "",
      isfinalErrorsEmpty: "",
      rodnéČíslo: "",
      názovZamestnávateľa: "",
      IČOzamestnávateľa: "",
      dátumDoZamestnania: "",
      čísloOP: "",
      datumOP:'',
      deti:'',
      suhlas: false,
    },

    onSubmit: (values) => {
      setLoading(true);

      fetch(scriptUrl, {
        method: "POST",
        body: new FormData(formRef.current),
      })
        .then((res) => {
          console.log("SUCCESSFULLY SUBMITTED");
          navigate("/dakujeme");
        })
        .catch((err) => console.log(err));
    },
    validate: (values) => {
      let errors = {};
/*
      if (!values.meno) {
        errors.meno = "Povinné pole!";
      }
      if (!values.deti) {
        errors.deti = "Povinné pole!";
      }
      if (!values.adresa) {
        errors.adresa = "Povinné pole!";
      }
      if (!values.IBAN) {
        errors.IBAN = "Povinné pole!";
      }
      if (!values.obecaPsč) {
        errors.obecaPsč = "Povinné pole!";
      }
      if (
        values.zamestnanie === "Zamestnanec na SK" ||
        values.zamestnanie === "Zamestnanec v zahraničí" ||
        values.zamestnanie === "Opatrovateľ živnostník EU" ||
        values.zamestnanie === "Živnostník na SK"
      ) {
        if (!values.názovZamestnávateľa) {
          errors.názovZamestnávateľa = "Povinné pole!";
        }
        if (!values.dátumDoZamestnania) {
          errors.dátumDoZamestnania = "Povinné pole!";
        }
      }

      if (!values.typBývania) {
        errors.typBývania = "Povinné pole!";
      }
      if (!values.tentoMesiac) {
        errors.tentoMesiac = "Povinné pole!";
      }
      if (!values.prechádzajúciMesiac) {
        errors.prechádzajúciMesiac = "Povinné pole!";
      }
      if (!values.predPrechádzajúciMesiac) {
        errors.predPrechádzajúciMesiac = "Povinné pole!";
      }
      if (!values.datumOP) {
        errors.datumOP = "Povinné pole!";
      }
      if (!values.bývanieOd) {
        errors.bývanieOd = "Povinné pole!";
      }
      if (!values.rodnéČíslo) {
        errors.rodnéČíslo = "Povinné pole!";
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

      if (!values.email) {
        errors.email = "Povinné pole!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "invalid email format";
      }
      if (!values.mobil) {
        errors.mobil = "Povinné pole!";
      }
      if (!values.čísloOP) {
        errors.čísloOP = "Povinné pole!";
      }
      if (!values.file) {
        errors.file = "Nahrajte občianský preukaz!";
      }
      if (values.suhlas === false) {
        errors.suhlas = "Bez tohto súhlasu, nemôžte odoslať formulár";
      }
      if (values.file === 1) {
        errors.file = "Príliš veľký súbor!";
      }
      if (!values.file1) {
        errors.file1 = "Nahrajte občianský preukaz!";
      }
      if (values.file1 === 1) {
        errors.file1 = "Príliš veľký súbor!";
      }

      if (values.file234 === 1) {
        errors.file234 = "Príliš veľký súbor!";
      }
      if (values.file234 === 3) {
        errors.file234 = "Nahrajte maximálne 3 súbory!";
      }
*/
      return errors;
    },
  });
  useEffect(() => {
    setIsValidate(formik.isValid);
    console.log(formik.isValid, "use efeeects");
  }, [formik.isValid]);
  useEffect(() => {
    showIfEmploy();
  }, [formik.values.zamestnanie]);
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
      border: "2px solid black",
      borderRadius: "0.5em",
      boxShadow: "none",
      fontSize: 14,
      "&:hover": {
        border: "2px solid black",
      },
    }),
  };
  const popwindow = () => {
    window.open("osobne.html", "", "height=200,width=400,scrollbars=no");
  };

  const handleChangeStatus = (file, allFiles, files) => {
    document.getElementById("fileData0").value = "";
    document.getElementById("mimeType0").value = "";
    document.getElementById("fileName0").value = "";
    formik.setFieldTouched("file", true);
    formik.setFieldValue("file", "");
    if (files[0].file.size > 15728640) {
      formik.setFieldValue("file", 1);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0].file);
    reader.onload = function (e) {
      console.log(e.target.result);
      let fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
      let mimeTypeStart = e.target.result.indexOf("data:") + 5;
      let mimeTypeEnd = e.target.result.indexOf(";");
      let mimeType = e.target.result.substr(
        mimeTypeStart,
        mimeTypeEnd - mimeTypeStart
      );
      let fileName = files[0].file.name;
      document.getElementById("fileData0").value = fileData;
      document.getElementById("mimeType0").value = mimeType;
      document.getElementById("fileName0").value = fileName;
      formik.setFieldValue("file", 2);
    };
  };

  const handleChangeStatus1 = (file, allFiles, files) => {
    document.getElementById("fileData1").value = "";
    document.getElementById("mimeType1").value = "";
    document.getElementById("fileName1").value = "";
    formik.setFieldTouched("file1", true);
    formik.setFieldValue("file1", "");
    if (files[0].file.size > 15728640) {
      formik.setFieldValue("file1", 1);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0].file);
    reader.onload = function (e) {
      console.log(e.target.result);
      let fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
      let mimeTypeStart = e.target.result.indexOf("data:") + 5;
      let mimeTypeEnd = e.target.result.indexOf(";");
      let mimeType = e.target.result.substr(
        mimeTypeStart,
        mimeTypeEnd - mimeTypeStart
      );
      let fileName = files[0].file.name;
      document.getElementById("fileData1").value = fileData;
      document.getElementById("mimeType1").value = mimeType;
      document.getElementById("fileName1").value = fileName;
      formik.setFieldValue("file1", 2);
    };
  };
  const handleChangeStatus234 = (file, allFiles, files) => {
    if (files.length >= 4) {
      formik.setFieldTouched("file234", true);
      formik.setFieldValue("file234", 3);
      return;
    }
    for (let i = 2; i < 5; i++) {
      document.getElementById("fileData" + i).value = "";
      document.getElementById("mimeType" + i).value = "";
      document.getElementById("fileName" + i).value = "";
    }
    formik.setFieldTouched("file234", true);
    formik.setFieldValue("file234", "");
    for (let i = 0; i < files.length; i++) {
      console.log(files.length);
      if (files[i].file.size > 15728640) {
        formik.setFieldValue("file234", 1);
        return;
      }
    }
    for (let i = 2; i < files.length + 2; i++) {
      console.log(files[i - 2]);
      const reader = new FileReader();
      reader.readAsDataURL(files[i - 2].file);
      reader.onload = function (e) {
        console.log(e.target.result);
        let fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
        let mimeTypeStart = e.target.result.indexOf("data:") + 5;
        let mimeTypeEnd = e.target.result.indexOf(";");
        let mimeType = e.target.result.substr(
          mimeTypeStart,
          mimeTypeEnd - mimeTypeStart
        );
        let fileName = files[i - 2].file.name;
        document.getElementById("fileData" + i).value = fileData;
        document.getElementById("mimeType" + i).value = mimeType;
        document.getElementById("fileName" + i).value = fileName;
      };
      formik.setFieldValue("file234", 2);
    }
  };

  // Select options for input

  const optionsZamestnanie = [
    { value: "Zamestnanec na SK", label: "Zamestnanec na SK" },
    { value: "Zamestnanec v zahraničí", label: "Zamestnanec v zahraničí" },
    { value: "Starobný dôchodca", label: "Starobný dôchodca" },
    { value: "Invalidný dôchodca", label: "Invalidný dôchodca" },
    { value: "Opatrovateľ živnostník EU", label: "Opatrovateľ živnostník EU" },
    { value: "Živnostník na SK", label: "Živnostník na SK (podnikateľ)" },
  ];
  const optionsRodinnýstav = [
    { value: "Slobodný/Slobodná", label: "Slobodný/Slobodná" },
    { value: "Ženatý/Vydatá", label: "Ženatý/Vydatá" },
    { value: "Rozvedený/Rozvedená", label: "Rozvedený/Rozvedená" },
    { value: "Vdovec/Vdova", label: "Vdovec/Vdova" },
    { value: "Druh/Družka", label: "Druh/Družka" },
  ];
  const optionsDeti = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
  ];
  const optionsVzdelanie = [
    { value: "Základné", label: "Základné" },
    { value: "Stredoškolské s maturitou", label: "Stredoškolské s maturitou" },
    {
      value: "Stredoškolské bez maturity",
      label: "Stredoškolské bez maturity",
    },
    { value: "Vysokoškolské bakalárske", label: "Vysokoškolské bakalárske" },
    { value: "Vysokoškolské", label: "Vysokoškolské" },
  ];
  const optionsTypBývania = [
    { value: "Vlastný byt/dom", label: "Vlastný byt/dom" },
    { value: "Družstevný byt", label: "Družstevný byt" },
    { value: "Bývanie u rodičov/u detí", label: "Bývanie u rodičov/u detí" },
    { value: "Najomné bývanie", label: "Najomné bývanie" },
    { value: "Iné", label: "Iné" },
  ];
  const optionsPríjemNaÚčet = [
    { value: "Áno", label: "Áno" },
    { value: "Nie", label: "Nie" },
  ];

  const showPrechodneByvanie = () => {
    let dorucovaciaAdresa = document.querySelector(".dorucovacia-adresa");
    let namedorucovaciaAdresa = document.querySelector(".section-name-doruc");

    if (prechodneByvanie === false) {
      setPrechodneByvanie(true);
      dorucovaciaAdresa.style.display = "flex";
      namedorucovaciaAdresa.style.display = "block";
    } else {
      setPrechodneByvanie(false);
      dorucovaciaAdresa.style.display = "none";
      namedorucovaciaAdresa.style.display = "none";
    }
    console.log(prechodneByvanie);
  };
  const suhlas = () => {
    formik.setFieldTouched("suhlas", true);
    if (suhlasOU === false) {
      setSuhlasOU(true);
      formik.setFieldValue("suhlas", true);
    } else {
      setSuhlasOU(false);
      formik.setFieldValue("suhlas", false);
    }
  };
  const showIfEmploy = () => {
    let showifemploy = document.querySelector(".if-employ-section");
    let nameshowifemploy = document.querySelector(".section-name-zamestnanie");

    if (
      formik.values.zamestnanie === "Zamestnanec na SK" ||
      formik.values.zamestnanie === "Zamestnanec v zahraničí" ||
      formik.values.zamestnanie === "Opatrovateľ živnostník EU" ||
      formik.values.zamestnanie === "Živnostník na SK"
    ) {
      showifemploy.style.display = "flex";
      nameshowifemploy.style.display = "block";
    } else {
      showifemploy.style.display = "none";
      nameshowifemploy.style.display = "none";
    }
  };
  const validate = () => {
    if (isValidate === true) {
      let finalErros = document.querySelector(".error-final");
      finalErros.style.display = "none";
    } else {
      let finalErros = document.querySelector(".error-final");
      finalErros.style.display = "block";
    }

    /*if(formik.isValid===false || isValidate===false){
    console.log(formik.errors)
    formik.setFieldValue("isfinalErrorsEmpty",false)

  }*/
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(scriptUrl, {
      method: "POST",
      body: new FormData(formRef.current),
    })
      .then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const changesuma = (e) => {
    let urk_sdz = 0.1834;
    if (e.target.name === "suma") {
      let urk_sdz = 0.1834;
      if (formik.values.doba === 1) urk_sdz = 0.391;
      if (formik.values.doba > 1 && formik.values.doba < 6) urk_sdz = 0.2098; //0.22;
      if (formik.values.doba > 5 && formik.values.doba < 9) urk_sdz = 0.1834;
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
      <div className="input-file-field-text-upload">
        Pôžičku nevieme schváliť, ak máte záznam v registri exekúcií a dlžníkov.
      </div>
      <form onSubmit={formik.handleSubmit} ref={formRef} name="google-sheet">
        <div className="container-form">
          <div className="rozdel">
          <div className="section-name">Vyberte požadovanú sumu</div>
          <h2>{formik.values.suma}</h2>
          <div className="containerslider">
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>500€</div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>15 000€</div>
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
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              min.
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              max.
            </div>
          </div>


          <div className="section-name" style={{ marginTop:'2em'}}>Vyberte dobu splácania</div>
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
            <div className="pullleft" style={{ fontSize: "1.2rem" }}>
              min.
            </div>
            <div className="pullright" style={{ fontSize: "1.2rem" }}>
              max.
            </div>
          </div>
          </div>
          <div className="rozdel">
          <div className="info">Priemerná hodnota RPNM od 9,12%</div>
          <h2> Mesačná splátka: {mounthsuma}€</h2>
          <div className="info2">
            Výška splátky je len orientačná bude vypočítaná na základe Vašich
            individuálnych podmienok
          </div>
          </div>
        </div>
        <div className="section-name">Základné informácie</div>

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
              {formik.errors.meno && formik.touched.meno ? (
                <div>{formik.errors.meno}</div>
              ) : null}
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
              {formik.errors.priezviskoMatky &&
              formik.touched.priezviskoMatky ? (
                <div>{formik.errors.priezviskoMatky}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="rodnéČíslo">Rodné číslo:</label>
            <input
              type="text"
              name="rodnéČíslo"
              id="rodnéČíslo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rodnéČíslo}
            />
            <div className="errors">
              {formik.errors.rodnéČíslo && formik.touched.rodnéČíslo ? (
                <div>{formik.errors.rodnéČíslo}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="čísloOP">Číslo občianského preukazu:</label>
            <input
              type="text"
              name="čísloOP"
              id="čísloOP"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.čísloOP}
            />
            <div className="errors">
              {formik.errors.čísloOP && formik.touched.čísloOP ? (
                <div>{formik.errors.čísloOP}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="datumOP">Platnosť občianského preukazu:</label>
            <input
              type="date"
              name="datumOP"
              id="datumOP"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.datumOP}
            />
            <div className="errors">
              {formik.errors.datumOP && formik.touched.datumOP ? (
                <div>{formik.errors.datumOP}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="rodinnýstav">Rodinný stav:</label>
            <Select
              styles={styles}
              options={optionsRodinnýstav}
              placeholder=""
              name="rodinnýstav"
              id="rodinnýstav"
              onChange={(e) => {
                formik.setFieldValue("rodinnýstav", e.value);
                formik.setFieldTouched("rodinnýstav", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.rodinnýstav && formik.touched.rodinnýstav ? (
                <div>{formik.errors.rodinnýstav}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="deti">Počet vyživovaných detí:</label>
            <Select
              styles={styles}
              options={optionsDeti}
              placeholder=""
              name="deti"
              id="deti"
              onChange={(e) => {
                formik.setFieldValue("deti", e.value);
                formik.setFieldTouched("deti", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.deti && formik.touched.deti ? (
                <div>{formik.errors.deti}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="vzdelanie">Vzdelanie:</label>
            <Select
              styles={styles}
              options={optionsVzdelanie}
              placeholder=""
              name="vzdelanie"
              id="vzdelanie"
              onChange={(e) => {
                formik.setFieldValue("vzdelanie", e.value);
                formik.setFieldTouched("vzdelanie", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.vzdelanie && formik.touched.vzdelanie ? (
                <div>{formik.errors.vzdelanie}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="zamestnanie">Vaše zamestnanie:</label>
            <Select
              styles={styles}
              options={optionsZamestnanie}
              placeholder=""
              name="zamestnanie"
              id="zamestnanie"
              onChange={(e) => {
                formik.setFieldValue("zamestnanie", e.value);
                formik.setFieldTouched("zamestnanie", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.zamestnanie && formik.touched.zamestnanie ? (
                <div>{formik.errors.zamestnanie}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="section-name-zamestnanie">Zamestanie</div>
        <div className="if-employ-section">
          <div className="if-employ">
            <label htmlFor="názovZamestnávateľa">Názov zamestnávateľa:</label>
            <input
              type="text"
              name="názovZamestnávateľa"
              id="názovZamestnávateľa"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.názovZamestnávateľa}
            />
            <div className="errors">
              {formik.errors.názovZamestnávateľa &&
              formik.touched.názovZamestnávateľa ? (
                <div>{formik.errors.názovZamestnávateľa}</div>
              ) : null}
            </div>
          </div>
          <div className="if-employ">
            <label htmlFor="IČOzamestnávateľa">IČO zamestnávateľa:</label>
            <input
              type="text"
              name="IČOzamestnávateľa"
              id="IČOzamestnávateľa"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.IČOzamestnávateľa}
            />
            <div className="errors">
              {formik.errors.IČOzamestnávateľa &&
              formik.touched.IČOzamestnávateľa ? (
                <div>{formik.errors.IČOzamestnávateľa}</div>
              ) : null}
            </div>
          </div>
          <div className="if-employ">
            <label htmlFor="dátumDoZamestnania">
              Dátum nástupu do zamestnania:
            </label>
            <input
              type="date"
              name="dátumDoZamestnania"
              id="dátumDoZamestnania"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.dátumDoZamestnania}
            />
            <div className="errors">
              {formik.errors.dátumDoZamestnania &&
              formik.touched.dátumDoZamestnania ? (
                <div>{formik.errors.dátumDoZamestnania}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="section-name">Trvalé bydlisko</div>

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
              {formik.errors.adresa && formik.touched.adresa ? (
                <div>{formik.errors.adresa}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="obecaPsč">Obec a PSČ:</label>
            <input
              type="text"
              name="obecaPsč"
              id="obecaPsč"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPsč}
            />
            <div className="errors">
              {formik.errors.obecaPsč && formik.touched.obecaPsč ? (
                <div>{formik.errors.obecaPsč}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="typBývania">Typ bývania:</label>
            <Select
              styles={styles}
              options={optionsTypBývania}
              placeholder=""
              name="typBývania"
              id="typBývania"
              onChange={(e) => {
                formik.setFieldValue("typBývania", e.value);
                formik.setFieldTouched("typBývania", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.typBývania && formik.touched.typBývania ? (
                <div>{formik.errors.typBývania}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="bývanieOd">Na adrese bývam od:</label>
            <input
              type="text"
              name="bývanieOd"
              id="bývanieOd"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.bývanieOd}
            />
            <div className="errors">
              {formik.errors.bývanieOd && formik.touched.bývanieOd ? (
                <div>{formik.errors.bývanieOd}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="prechodne-bydlisko-field">
          <input type="checkbox" onChange={showPrechodneByvanie} />
          Chcem doručovať poštu na inú adresu.
        </div>
        <div className="section-name-doruc">Doručovacia adresa</div>

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
              {formik.errors.adresaDorucovacia &&
              formik.touched.adresaDorucovacia ? (
                <div>{formik.errors.adresaDorucovacia}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="obecaPsčDorucovacia">Obec a PSČ:</label>
            <input
              type="text"
              name="obecaPsčDorucovacia"
              id="obecaPsčDorucovacia"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.obecaPsčDorucovacia}
            />
            <div className="errors">
              {formik.errors.obecaPsčDorucovacia &&
              formik.touched.obecaPsčDorucovacia ? (
                <div>{formik.errors.obecaPsčDorucovacia}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="typBývaniaDorucovacia">Typ bývania:</label>
            <Select
              styles={styles}
              options={optionsTypBývania}
              placeholder=""
              name="typBývania"
              id="typBývania"
              onChange={(e) => {
                formik.setFieldValue("typBývaniDorucovaciaa", e.value);
                formik.setFieldTouched("typBývania", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.typBývaniaDorucovacia &&
              formik.touched.typBývaniaDorucovacia ? (
                <div>{formik.errors.typBývaniaDorucovacia}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="bývanieOdDorucovacia">Na adrese bývam od:</label>
            <input
              type="text"
              name="bývanieOdDorucovacia"
              id="bývanieOdDorucovacia"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.bývanieOdDorucovacia}
            />
            <div className="errors">
              {formik.errors.bývanieOdDorucovacia &&
              formik.touched.bývanieOdDorucovacia ? (
                <div>{formik.errors.bývanieOdDorucovacia}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="section-name">Kontaktné údaje</div>

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
              {formik.errors.mobil && formik.touched.mobil ? (
                <div>{formik.errors.mobil}</div>
              ) : null}
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
              {formik.errors.email && formik.touched.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="section-name-prijem">
          Čistý mesačný príjem{" "}
          <div className="no-wrap">za posledné 3 mesiace</div>
        </div>

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
              {formik.errors.tentoMesiac && formik.touched.tentoMesiac ? (
                <div>{formik.errors.tentoMesiac}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="prechádzajúciMesiac">Predchádzajúci mesiac:</label>
            <input
              type="text"
              name="prechádzajúciMesiac"
              id="prechádzajúciMesiac"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.prechádzajúciMesiac}
            />
            <div className="errors">
              {formik.errors.prechádzajúciMesiac &&
              formik.touched.prechádzajúciMesiac ? (
                <div>{formik.errors.prechádzajúciMesiac}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="predPrechádzajúciMesiac">
              Predpredcházajúci mesiac:
            </label>
            <input
              type="text"
              name="predPrechádzajúciMesiac"
              id="predPrechádzajúciMesiac"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.predPrechádzajúciMesiac}
            />
            <div className="errors">
              {formik.errors.predPrechádzajúciMesiac &&
              formik.touched.predPrechádzajúciMesiac ? (
                <div>{formik.errors.predPrechádzajúciMesiac}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="section-name">Bankové spojenie</div>

        <div className="personal-data">
          <div className="personal-data-field">
            <label htmlFor="IBAN">
              IBAN (Účet, kde chcete čerpať pôžičku):
            </label>
            <input
              type="text"
              name="IBAN"
              id="IBAN"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.IBAN}
            />
            <div className="errors">
              {formik.errors.IBAN && formik.touched.IBAN ? (
                <div>{formik.errors.IBAN}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex-files-container">
          <div className="files-container">
            <div className="section-name">Kópia občianského preukazu</div>
            <div className="input-file-field-text">
              Občiansky preukaz z oboch strán, čitateľný, v plnej kvalite bez
              chýbajúcich rohov a rozmazaného písma - ideálne fotiť na bielom
              podklade.
            </div>
            <div className="input-file-field-name">Predná strana</div>
            <div className="input-file-field-text-upload">
              Nahrajte max. 1 súbor. (Obrázok alebo PDF)
            </div>
            <div className="input-file-field">
              <Dropzone
                LayoutComponent={NoDropzoneLayout}
                multiple={false}
                styles={{
                  inputLabelWithFiles: { display: "none" },
                  previewImage: {
                    maxHeight: 200,
                    maxWidth: 200,
                    marginLeft: 20,
                  },
                  dropzone: {
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 5,
                  },
                  inputLabel: { color: "#021391" },
                }}
                onChangeStatus={handleChangeStatus}
                inputContent="Vybrať súbor"
                accept="image/*,.pdf"
                maxFiles={1}
                maxSizeBytes={15728640}
              />
              <div className="error-file-size">
                {formik.errors.file && formik.touched.file ? (
                  <div>{formik.errors.file}</div>
                ) : null}
              </div>
            </div>
            <div className="input-file-field-name">Zadná strana</div>
            <div className="input-file-field-text-upload">
              Nahrajte max. 1 súbor. (Obrázok alebo PDF)
            </div>
            <div className="input-file-field">
              <Dropzone
                LayoutComponent={NoDropzoneLayout}
                multiple={false}
                styles={{
                  inputLabelWithFiles: { display: "none" },
                  previewImage: {
                    maxHeight: 200,
                    maxWidth: 200,
                    marginLeft: 20,
                  },
                  dropzone: {
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 5,
                  },
                  inputLabel: { color: "#021391" },
                }}
                onChangeStatus={handleChangeStatus1}
                inputContent="Vybrať súbor"
                accept="image/*,.pdf"
                maxFiles={1}
                maxSizeBytes={15728640}
              />
              <div className="error-file-size">
                {formik.errors.file1 && formik.touched.file1 ? (
                  <div>{formik.errors.file1}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="files-container">
            <div className="section-name">Výpis z účtu</div>
            <div className="input-file-field-text">
              Výpis z účtu za predchádzajúci mesiac v plnej kvalite a plnom
              rozsahu strán. Akceptujeme kópiu výpisu z účtu, stiahnutú z
              internet bankingu, alebo oskenovanú, prípadne kvalitne odfotenú
              kópiu. V prípade ak nie ste majiteľom účtu je potrebné doložiť
              dispozičné právu k účtu.
            </div>
            <div className="input-file-field-name-nepovinne">Výpis z účtu</div>
            <div className="input-file-field-text-upload">
              Nahrajte max. 3 súbory. (Najvhodnejšie 1-2 PDF súbory.)
            </div>
            <div className="input-file-field">
              <Dropzone
                LayoutComponent={NoDropzoneLayout}
                multiple={true}
                styles={{
                  previewImage: {
                    maxHeight: 100,
                    maxWidth: 100,
                    marginLeft: 20,
                  },
                  dropzone: {
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 5,
                  },
                  inputLabel: { color: "#021391" },
                }}
                onChangeStatus={handleChangeStatus234}
                inputContent="Vybrať súbory"
                accept="image/*,.pdf"
                maxSizeBytes={15728640}
                maxFiles={4}
                inputWithFilesContent={"Pridať súbory"}
              />
              <div className="error-file-size">
                {formik.errors.file234 && formik.touched.file234 ? (
                  <div>{formik.errors.file234}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="prechodne-bydlisko-field-suhlas-error">
          <input type="checkbox" onChange={suhlas} />
          Súhlasím so spracovaním{" "}
          <a className="suhlasim" onClick={handleOpen}>
            osobných údajov.
          </a>
        </div>
        <div className="error-file-size">
          {formik.errors.suhlas && formik.touched.suhlas ? (
            <div>{formik.errors.suhlas}</div>
          ) : null}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={style2}>
              <div className="name-modal">Spracovanie osobných údajov</div>
              <FontAwesomeIcon
                onClick={handleClose}
                className="icona"
                icon="fa-solid fa-x"
              />
            </Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vyššie uvedené osobné údaje vyplnením a zaslaním tohto formulára
              poskytujete našej spoločnosti – Zinc Euro, a.s. so sídlom
              Karpatská 3256/15, 058 01 Poprad , IČO: 47918551, DIČ: 2024151833,
              IČ DPH: SK2024151833, ako sprostredkovateľovi podľa zákona č.
              186/2009 Z. z. o finančnom sprostredkovaní a finančnom
              poradenstve, ktorá je držiteľom povolenia Národnej banky Slovenska
              na výkon činnosti viazaného finančného agenta, Reg. číslo NBS:
              242137 a je zapísaná v podregistri poskytovania úverov, úverov na
              bývanie a spotrebiteľských úverov odo dňa 13.12.2018 (ďalej aj len
              ako „viazaný finančný agent“), a ktorá je tiež súčasne
              sprostredkovateľom osobných údajov (t. j. spracúva osobné údaje v
              mene prevádzkovateľa) podľa Čl. 28 Nariadenia EP a Rady (EÚ)
              2016/679 z 27. apríla 2016 (GDPR) a to pre prevádzkovateľa –
              spoločnosť Amico Finance a. s. so sídlom Dvořákovo nábrežie 4, 811
              02 Bratislava, IČO: 48 113 671, zapísaná v obchodnom registri
              Okresného súdu Bratislava I, odd. Sa, vl. č. 6128/B ako
              poskytovateľa spotrebiteľských úverov (ďalej len Amico Finance, a.
              s.). Naša spoločnosť spracúva osobné údaje ako prevádzkovateľ iba
              v rozsahu nevyhnutnom na plnenie jej povinností a výkon práv
              finančného agenta v súlade so zákonom č. 186/2009 Z. z. Údaje,
              ktoré uvediete v tomto formulári, budú zo strany prevádzkovateľa –
              spoločnosti Amico Finance a. s. spracúvané za účelom zistenia a
              overenia totožnosti klienta a plnenia iných povinností podľa
              zákona č. 297/2008 Z. z. o ochrane pred legalizáciou príjmov z
              trestnej činnosti a o ochrane pred financovaním terorizmu,
              posudzovania žiadosti o poskytnutie spotrebiteľského úveru,
              vrátane posudzovania schopnosti klienta splácať splátky
              spotrebiteľského úveru a za účelom uzatvárania, plnenia a správy
              zmluvy o spotrebiteľskom úvere/inom úvere a splnenia si zákonných
              povinností prevádzkovateľa v súvislosti s informovaním klienta pri
              poskytovaní spotrebiteľského úveru. Podrobnosti o spracovaní
              osobných údajov zo strany spoločnosti Amico Finance a. s., ktoré
              zároveň spracúva naša spoločnosť ako sprostredkovateľ podľa Čl. 28
              GDPR, ako aj o Vašich právach s tým súvisiacich nájdete na
              internetovej stránke prevádzkovateľa
              https://www.ahojsplatky.sk/ochrana-osobnych-udajov. Naša
              spoločnosť Zinc Euro, a.s. vykonáva finančné sprostredkovanie na
              základe písomnej zmluvy s jednou finančnou inštitúciou a to
              spoločnosťou Amico Finance a. s. Táto zmluva má výhradnú povahu.
              Bližšie informácie o finančnom sprostredkovaní Vám budú poskytnuté
              písomne prostredníctvom formulára a súčasne na webe
              https://www.zinceuro.sk/informacie-o-financnom-sprostredkovani.
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
              Počkajte prosím na tejto stránke, údaje sa odosielaju.
            </div>
          </Box>
        </Modal>
        <input type="hidden" name="fileData0" id="fileData0" />
        <input type="hidden" name="fileName0" id="fileName0" />
        <input type="hidden" name="mimeType0" id="mimeType0" />

        <input type="hidden" name="fileData1" id="fileData1" />
        <input type="hidden" name="fileName1" id="fileName1" />
        <input type="hidden" name="mimeType1" id="mimeType1" />

        <input type="hidden" name="fileData2" id="fileData2" />
        <input type="hidden" name="fileName2" id="fileName2" />
        <input type="hidden" name="mimeType2" id="mimeType2" />

        <input type="hidden" name="fileData3" id="fileData3" />
        <input type="hidden" name="fileName3" id="fileName3" />
        <input type="hidden" name="mimeType3" id="mimeType3" />
        <input type="hidden" name="fileData4" id="fileData4" />
        <input type="hidden" name="fileName4" id="fileName4" />
        <input type="hidden" name="mimeType4" id="mimeType4" />
        <div className="error-final">
          Skontrolujte povinné údaje alebo správnosť.
        </div>
        <div className="submit-button">
          <button type="submit" onClick={() => validate()} className="button">
            Odoslať nezáväznu žiadosť
          </button>
        </div>
      </form>
    </>
  );
}
