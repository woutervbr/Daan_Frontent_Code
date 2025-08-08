import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./Toaster/Toaster";
import { ReSubs } from "../context/ReSubsContext";

const ValSchema = yup.object().shape({
  dadGrandfather: yup
    .string()
    .required("Dad's grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  dadGrandMother: yup
    .string()
    .required("Dad's grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  momGrandfather: yup
    .string()
    .required("Mom's grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  momGrandMother: yup
    .string()
    .required("Mom's grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  grandfather: yup
    .string()
    .optional("Your grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  grandMother: yup
    .string()
    .optional("Your grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  father: yup
    .string()
    .required("Father's name is required")
    .max(12, "Must be 12 characters or less"),

  mother: yup
    .string()
    .required("Mother's name is required")
    .max(12, "Must be 12 characters or less"),

  uncle1: yup
    .string()
    .optional("First uncle's name is required")
    .max(12, "Must be 12 characters or less"),

  aunt1: yup
    .string()
    .optional("First aunt's name is required")
    .max(12, "Must be 12 characters or less"),

  uncle2: yup
    .string()
    .optional("Second uncle's name is required")
    .max(12, "Must be 12 characters or less"),

  aunt2: yup
    .string()
    .optional("Second aunt's name is required")
    .max(12, "Must be 12 characters or less"),

  brothers: yup
    .array()
    .of(yup.string().trim().max(12, "Must be 12 characters or less").optional())
    .optional(),
  sisters: yup
    .array()
    .of(yup.string().trim().max(12, "Must be 12 characters or less").optional())
    .optional(),
  cousins: yup
    .array()
    .of(yup.string().trim().max(12, "Must be 12 characters or less").optional())
    .optional(),
  me: yup
    .string()
    .required("Your name is required")
    .max(12, "Must be 12 characters or less"),

  wife: yup
    .string()
    .required("Wife's name is required")
    .max(12, "Must be 12 characters or less"),

  children: yup
    .array()
    .of(yup.string().trim().max(12, "Must be 12 characters or less").optional())
    .optional(),
});

const Overjoucomponet = () => {
  const [data, setData] = useState({});
  const { isActive,setOpenToBlock } = ReSubs();

  const [OwnFamily, setOwnFamily] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValSchema),
    defaultValues: {
      dadGrandfather: "",
      dadGrandMother: "",
      momGrandfather: "",
      momGrandMother: "",
      grandfather: "",
      grandMother: "",
      father: "",
      mother: "",
      uncle1: "",
      aunt1: "",
      uncle2: "",
      aunt2: "",
      brothers: [""],
      sisters: [""],
      cousins: [""],
      me: "",
      wife: "",
      children: [""],
    },
  });

  // Use useFieldArray for dynamic fields
  const {
    fields: brotherFields,
    append: appendBrother,
    remove: removeBrother,
  } = useFieldArray({
    control,
    name: "brothers",
  });
  const {
    fields: sisterFields,
    append: appendSister,
    remove: removeSister,
  } = useFieldArray({
    control,
    name: "sisters",
  });
  const {
    fields: cousinFields,
    append: appendCousin,
    remove: removeCousin,
  } = useFieldArray({
    control,
    name: "cousins",
  });
  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: "children",
  });

  const fetchData = async () => {
   
    try {
      const response = await fetch(
        `${baseUrl}/create-story?userId=${myCurrId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      const storyData = responseData?.find?.storyData;

      // if (storyData) {
      //   // Convert single values to arrays for dynamic fields
      //   const formattedData = {
      //     ...storyData,
      //     brothers: storyData.brothers?.length ? storyData.brothers : [""],
      //     sisters: storyData.sisters?.length ? storyData.sisters : [""],
      //     cousins: storyData.cousins?.length ? storyData.cousins : [""],
      //     children: storyData.children?.length ? storyData.children : [""],
      //   };
      //   reset(formattedData);
      // }

      if (storyData) {
        const formattedData = {
          ...storyData,
          brothers: Array.isArray(storyData.brothers) && storyData.brothers.length > 0
            ? storyData.brothers
            : [""], // Ensure at least one empty field
          sisters: Array.isArray(storyData.sisters) && storyData.sisters.length > 0
            ? storyData.sisters
            : [""], // Ensure at least one empty field
          cousins: Array.isArray(storyData.cousins) && storyData.cousins.length > 0
            ? storyData.cousins
            : [""], // Ensure at least one empty field
          children: Array.isArray(storyData.children) && storyData.children.length > 0
            ? storyData.children
            : [""], // Ensure at least one empty field
        };
        reset(formattedData);
      } else {
        // If no data, reset to default values with empty fields
        reset({
          dadGrandfather: "",
          dadGrandMother: "",
          momGrandfather: "",
          momGrandMother: "",
          grandfather: "",
          grandMother: "",
          father: "",
          mother: "",
          uncle1: "",
          aunt1: "",
          uncle2: "",
          aunt2: "",
          brothers: [""],
          sisters: [""],
          cousins: [""],
          me: "",
          wife: "",
          children: [""],
        });
      }

      if (
        storyData?.wife ||
        (storyData?.children &&
          storyData.children.some((val) => val && val.trim() !== ""))
      ) {
        setOwnFamily(true);
      }

      setData(responseData?.find || {});
    } catch (error) {
      console.error("Error fetching data:", error);

      showErrorToast("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitData = async (values) => {
    if (!isActive) {
      setOpenToBlock(true);
    return;
  }
    try {
      // Filter out empty strings from arrays
      const sanitizedValues = {
        ...values,
        brothers: values.brothers.filter((val) => val && val.trim() !== ""),
        sisters: values.sisters.filter((val) => val && val.trim() !== ""),
        cousins: values.cousins.filter((val) => val && val.trim() !== ""),
        children: values.children.filter((val) => val && val.trim() !== ""),
      };

      const body = {
        userId: myCurrId,
        storyData: sanitizedValues,
      };

      const response = await fetch(`${baseUrl}/create-story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data?.message === "Data add successfully") {
        showSuccessToast("Succesvol opgeslagen");

      } else {
        showErrorToast("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      showErrorToast("Failed to save data");
    }
  };

  return (
    <div className="main-Overjoucomponet">
      <ToastContainer position="top-center" autoClose={1000} />
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="Overjoucomponet-box">
            <div className="   add-box-volgende">
            <h2>Uw familie in beeld
</h2>
            <p>
Vul hier de namen van uw familie in. We maken er een stamboom van die gedrukt wordt in uw boek.
            </p>
          </div>
          <div className="Overjoucomponet-heading">
            <h2>Mijn familie</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Grootvader van  vaderskant ", name: "dadGrandfather" },
              { label: "Grootmoeder van vaderskant", name: "dadGrandMother" },
              { label: "Grootvader van moederskant", name: "momGrandfather" },
              { label: "Grootmoeder van moederskant   ", name: "momGrandMother" },
              // { label: "Grootvader", name: "grandfather" },
              // { label: "Grootmoeder", name: "grandMother" },
              { label: "Vader", name: "father" },
              { label: "Moeder", name: "mother" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && (
                  <p style={{ color: "red" }}>{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Tantes en ooms
</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Oom 1", name: "uncle1" },
              { label: "Tante 1", name: "aunt1" },
              { label: "Oom 2", name: "uncle2" },
              { label: "Tante 2", name: "aunt2" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && (
                  <p style={{ color: "red" }}>{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Broers en zussen</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            <div className="Overjoucomponet-group">
              <h3>Broers</h3>
              {brotherFields.map((field, index) => (
                <div
                  className="Overjoucomponet-group"
                  key={field.id}
                  style={{ width: "100%" }}
                >
                  <label>Broer  {index + 1}</label>
                  <div className="Overjoucomponent-inner">
                    <input type="text" {...register(`brothers.${index}`)} />

                    <div className="box-plus">
                      <button
                        type="button"
                        onClick={() => removeBrother(index)}
                        disabled={brotherFields.length === 1}
                      >
                        −
                      </button>
                      {index === brotherFields.length - 1 && (
                        <button type="button" onClick={() => appendBrother("")}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.brothers?.[index] && (
                    <p style={{ color: "red" }}>
                      {errors.brothers[index].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="Overjoucomponet-group">
              <h3>Zussen</h3>
              {sisterFields.map((field, index) => (
                <div
                  className="Overjoucomponet-group"
                  key={field.id}
                  style={{ width: "100%" }}
                >
                  <label>Zus  {index + 1}</label>
                  <div className="Overjoucomponent-inner">
                    <input type="text" {...register(`sisters.${index}`)} />
                    <div className="box-plus">
                      <button
                        type="button"
                        onClick={() => removeSister(index)}
                        disabled={sisterFields.length === 1}
                      >
                        −
                      </button>
                      {index === sisterFields.length - 1 && (
                        <button type="button" onClick={() => appendSister("")}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.sisters?.[index] && (
                    <p style={{ color: "red" }}>
                      {errors.sisters[index].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="Overjoucomponet-group">
              <h3>Neef of nicht 
</h3>
              {cousinFields.map((field, index) => (
                <div
                  className="Overjoucomponet-group"
                  key={field.id}
                  style={{ width: "100%" }}
                >
                  <label>Neef of nicht  {" "} {index + 1}</label>
                  <div className="Overjoucomponent-inner">
                    <input type="text" {...register(`cousins.${index}`)} />
                    <div className="box-plus">
                      <button
                        type="button"
                        onClick={() => removeCousin(index)}
                        disabled={cousinFields.length === 1}
                      >
                        −
                      </button>
                      {index === cousinFields.length - 1 && (
                        <button type="button" onClick={() => appendCousin("")}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.cousins?.[index] && (
                    <p style={{ color: "red" }}>
                      {errors.cousins[index].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading Family-Checkbox">
            <h2>
Je eigen familie</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Ik", name: "me" },
              { label: "Partner", name: "wife" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && (
                  <p style={{ color: "red" }}>{errors[name].message}</p>
                )}
              </div>
            ))}
            <div className="Overjoucomponet-group">
              <h3>Kinderen</h3>
              {childFields.map((field, index) => (
                <div
                  className="Overjoucomponet-group"
                  key={field.id}
                  style={{ width: "100%" }}
                >
                  <label>Kind  {index + 1}</label>
                  <div className="Overjoucomponent-inner">
                    <input type="text" {...register(`children.${index}`)} />
                    <div className="box-plus">
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        disabled={childFields.length === 1}
                      >
                        −
                      </button>
                      {index === childFields.length - 1 && (
                        <button type="button" onClick={() => appendChild("")}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.children?.[index] && (
                    <p style={{ color: "red" }}>
                      {errors.children[index].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Overjoucomponet-save-btn">
          <button
            type="submit"
          >
    Opslaan

          </button>
        </div>
      </form>
    </div>
  );
};

export default Overjoucomponet;
