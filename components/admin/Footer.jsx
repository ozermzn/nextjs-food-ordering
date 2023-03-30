import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/FooterSchema";
import axios from "axios";
import { Icons, toast } from "react-toastify";
const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  const [iconLink, setIconLink] = useState();
  const [iconLinks, setIconLinks] = useState([]);
  const [icon, setIcon] = useState();
  const [icons, setIcons] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooterData(res.data);
        setIcons(res.data[0].icon);
        setIconLinks(res.data[0].link);
      } catch (error) {
        console.log(error);
      }
    };
    getFooterData();
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData[0]._id}`,
        values
      );

      if (res.status === 200) {
        toast.success("Update success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteIcon = (icn) => {
    const updatedIcons = footerData[0]?.icon.filter((item, i) => {
      return item !== icn;
    });
    setIcons(updatedIcons);
  };
  const handleSetIcons = () => {
    setIcons([...footerData[0].icon, icon]);
    setIconLinks([...footerData[0].link, iconLink]);
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData[0]?.location,
        email: footerData[0]?.email,
        phone: footerData[0]?.phoneNumber,
        description: footerData[0]?.description,
        day: footerData[0]?.day,
        time: footerData[0]?.hour,
        icon: icons,
        link: iconLinks,
      },
      onSubmit,
      validationSchema: footerSchema,
    });
  // const handleCreateFooter = async () => {
  //   const newFooter = {
  //     location: values.location,
  //     email: values.email,
  //     phoneNumber: values.phone,
  //     description: values.description,
  //     icon: icons,
  //     link: iconLinks,
  //     day: values.day,
  //     hour: values.time,
  //   };
  //   console.log(newFooter);
  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/footer`,
  //       newFooter
  //     );
  //     if (res.status === 201) {
  //       setFooterData(res.data);
  //       toast.success("Success");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="w-full">
      <div className="p-8 flex-1 w-full">
        <Title className={"text-[40px]"}>Footer Settings</Title>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
            <div className="w-full">
              <Input
                type={"text"}
                name="location"
                errorMessage={errors.location}
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                Location
              </Input>
              {errors.location && (
                <span className="danger-input">{errors.location}</span>
              )}
            </div>
            <div>
              <Input
                type={"email"}
                name="email"
                errorMessage={errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                Email
              </Input>
              {errors.email && (
                <span className="danger-input">{errors.email}</span>
              )}
            </div>
            <div>
              <Input
                type={"number"}
                name="phone"
                errorMessage={errors.phone}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                Phone Number
              </Input>
              {errors.phone && (
                <span className="danger-input">{errors.phone}</span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                name="description"
                errorMessage={errors.description}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                Description
              </Input>
              {errors.description && (
                <span className="danger-input">{errors.description}</span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                name="day"
                errorMessage={errors.day}
                value={values.day}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                Everyday
              </Input>
              {errors.day && <span className="danger-input">{errors.day}</span>}
            </div>
            <div>
              <Input
                type={"text"}
                name="time"
                errorMessage={errors.time}
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                12:00 - 24:00
              </Input>
              {errors.time && (
                <span className="danger-input">{errors.time}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary flex items-center font-semibold justify-center gap-x-2  w-1/2 !bg-green-500"
            >
              Update
            </button>
          </div>
        </form>
        <div className="flex items-center flex-col mt-10 w-full  gap-y-10 md:flex-row gap-4 justify-between">
          <div className="flex w-full flex-col items-center gap-4 flex-1">
            <Input
              type={"text"}
              name="link"
              onChange={(e) => setIconLink(e.target.value)}
              value={iconLink}
            >
              https://{iconLink}
            </Input>
            <Input
              type={"text"}
              name="icon"
              onChange={(e) => setIcon(e.target.value)}
              value={icon}
            >
              Icon name
            </Input>

            <button
              type="button"
              className="btn-primary w-full"
              onClick={handleSetIcons}
            >
              Add
            </button>
          </div>
          <div
            className="flex gap-x-4 items-center justify-around flex-1
            "
          >
            {icons &&
              icons.map((icon, index) => (
                <div key={index} className="relative p-3">
                  <i
                    className={`fa-brands fa-${icon?.toLowerCase()} fa-2xl`}
                  ></i>
                  <button
                    type="button"
                    onClick={() => handleDeleteIcon(icon)}
                    className="absolute -top-2 right-0 bg-danger text-white text-xs rounded-full px-[5px] py-[2px] hover:opacity-70"
                  >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
