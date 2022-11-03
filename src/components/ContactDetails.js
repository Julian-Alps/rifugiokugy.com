import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaRegEnvelope, FaFacebook } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Emoji from "react-emoji-render";

const ContactDetails = ({ infos, howtoget, address, phone, email, fb }) =>(

      <div className="section box">
        <div className="container">
          <h3 className="title">
            {infos}
            </h3>
              <div className="columns is-vcentered">
                <div className="column">
                  <h4 className="title">
                    <FormattedMessage id='contact.howtoget'/>
                  </h4>
                  <ul key='howtoget-list'>
                    {howtoget.map( (list, id) => (
                      <li key={id}><Emoji text={list} /></li>
                    ))}
                  </ul>

                </div>

                <div className="column is-vertical-center">
                  <h4 className="title">
                    <FormattedMessage id='contact.contacts'/>
                  </h4>
                  {address && (
                  <div className="content">
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarkerAlt className="menu-names"/> {address}
              </a>
            </div>
            )}
            {phone && (
              <div className="content">
              <a className="Contact--Details--Item" href={`tel:${phone}`}>
                <FaPhone className="menu-names"/> {phone}
              </a>
              </div>
            )}
            {email && (
              <div className="content">
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <FaRegEnvelope className="menu-names"/> {email}
              </a>
              </div>
            )}
            {fb && (
              <div className="content">
              <a className="Contact--Details--Item" href={`https://m.me/${fb}`}>
                <FaFacebook className="menu-names"/> {fb}
              </a>
              </div>
            )}
            </div>
          </div>
          </div>
        </div>
    )


ContactDetails.propTypes = {
  infos: PropTypes.string,
  howtoget: PropTypes.array,
  image: PropTypes.object,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  fb: PropTypes.string
}

export default ContactDetails
