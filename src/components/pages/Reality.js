import React, {useRef,useState,useEffect} from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Typography} from "@mui/material";
import "./Reality.css"
import Select from "react-select";
import CardReality from "../CardReality";

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
    bgcolor: "white",
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
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

export default function Reality() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isValidate, setIsValidate] = useState(false);

    const [suhlasOU, setSuhlasOU] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const navigate = useNavigate();
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
      const formRef = useRef(null);
    const scriptUrl =
    "https://script.google.com/macros/s/AKfycbwGBBV_B_4e3guVUlPBi5W9n3T_J7PujRKDzbS0rR3SdgA4r125NLvXMCAHrCwJpFA/exec";
  const formik = useFormik({
    initialValues: {
      meno: "",
      priezvisko: "",
      adresa: "",
      typBytu:"",
      email: "",
      mobil: "",
      suhlas: false,
    },

    onSubmit: (values) => {
      setLoading(true);

      fetch(scriptUrl, {
        method: "POST",
        body: new FormData(formRef.current),
      })
        .then((res) => {
          navigate("/dakujemeReality");
        })
        .catch((err) => console.log(err));
    },
    validate: (values) => {
      let errors = {};

      if (!values.meno) {
        errors.meno = "Povinné pole!";
      }
      if (!values.priezvisko) {
        errors.priezvisko = "Povinné pole!";
      }
      if (!values.adresa) {
        errors.adresa = "Povinné pole!";
      }
      if (!values.typBytu) {
        errors.typBytu = "Povinné pole!";
      }
      if (!values.email) {
        errors.email = "Povinné pole!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Zlý format emailu!";
      }
      if (!values.mobil) {
        errors.mobil = "Povinné pole!";
      }
      if (values.suhlas === false) {
        errors.suhlas = "Bez tohto súhlasu, nemôžte odoslať formulár";
      }
      return errors;
    },
  });
  const typBytu = [
    { value: "Garsósnka", label: "Garsósnka" },
    { value: "1 izbový byt", label: "1 izbový byt" },
    { value: "2 izbový byt", label: "2 izbový byt" },
    { value: "3 izbový byt", label: "3 izbový byt" },
    { value: "4 a viac izbový byt (nie dom)", label: "4 a viac izbový byt (nie dom)" },
  ];

  useEffect(() => {
    setIsValidate(formik.isValid);
  }, [formik.isValid]);
  return (
    <div>
        <CardReality/>
      <h1 className="header-form"  id="box">
        Vyplňte kontaktný formulár, aby sme Vás mohli kontaktovať ohľadom
        odkúpenia bytu.
      </h1>
      <form onSubmit={formik.handleSubmit} ref={formRef} name="google-sheet">
        <div className="form-container">
        <div className="personal-data-field">
            <label htmlFor="meno">Meno:</label>
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
            <label htmlFor="priezvisko">Priezvisko:</label>
            <input
              type="text"
              name="priezvisko"
              id="priezvisko"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.priezvisko}
            />
            <div className="errors">
              {formik.errors.priezvisko && formik.touched.priezvisko ? (
                <div>{formik.errors.priezvisko}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="typBytu">Typ bytu:</label>
            <Select
              styles={styles}
              options={typBytu}
              placeholder=""
              name="typBytu"
              id="typBytu"
              onChange={(e) => {
                formik.setFieldValue("typBytu", e.value);
                formik.setFieldTouched("typBytu", false);
              }}
              isSearchable={false}
            />
            <div className="errors">
              {formik.errors.typBytu && formik.touched.typBytu ? (
                <div>{formik.errors.typBytu}</div>
              ) : null}
            </div>
          </div>
          <div className="personal-data-field">
            <label htmlFor="adresa">Adresa:</label>
            <input
              type="text"
              name="adresa"
              id="adresa"
              placeholder="Ulica, Súpisné číslo, Mesto/Obec"
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
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
          <div className="personal-data-field">
            <label htmlFor="mobil">Mobil:</label>
            <input
              type="tel"
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
        <div className="error-final">
          Skontrolujte povinné údaje alebo správnosť.
        </div>
        <div className="submit-button">
          <button type="submit" onClick={() => validate()} className="button">
            Odoslať
          </button>
        </div>
</form>
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
    </div>
  );
}
