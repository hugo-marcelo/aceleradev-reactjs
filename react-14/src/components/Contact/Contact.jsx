import React from "react";
import { format } from "date-fns";

import "./Contact.scss";

const Contact = ({ data }) => {
  const {
    name,
    avatar,
    company,
    department,
    admissionDate,
    phone,
    country,
  } = data;
  return (
    <article className="contact" data-testid="contact">
      <span className="contact__avatar">
        <img src={avatar} alt={name} />
      </span>
      <span className="contact__data" data-testid="contact-name">
        {name}
      </span>
      <span className="contact__data" data-testid="contact-phone">
        {phone}
      </span>
      <span className="contact__data" data-testid="contact-country">
        {country}
      </span>
      <span className="contact__data" data-testid="contact-date">
        {format(new Date(admissionDate), "dd/MM/yyyy")}
      </span>
      <span className="contact__data" data-testid="contact-company">
        {company}
      </span>
      <span className="contact__data" data-testid="contact-department">
        {department}
      </span>
    </article>
  );
};

export default Contact;
