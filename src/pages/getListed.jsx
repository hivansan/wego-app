import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-date-picker";
import Joi from "joi";

import DarkPrimaryButton from "../atoms/darkPrimaryButton";
import { set } from "lodash";

const GetListed = (props) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    lookingFor: null,
    email: null,
    discordUser: null,
    name: null,
    description: null,
    discordProject: null,
    twitter: null,
    website: null,
    opensea: null,
    status: null,
    dropDate: null,
    releaseDate: null,
    address: null,
    fee: null,
    extra: null,
  });
  const [otherCheckBox, setOtherCheckbox] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const schema = Joi.object({
      lookingFor: Joi.string().required().messages({
        "string.base":
          "Please choose an option and write your answer if you choose 'Other'",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .message("Must be a valid email.")
        .required(),
      discordUser: Joi.string().allow(null),
      name: Joi.string().required().allow(null),
      description: Joi.string().allow(null),
      discordProject: Joi.string().allow(null),
      twitter: Joi.string()
        .pattern(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)

        .allow(null)
        .message("Enter a valid twitter link."),
      website: Joi.string()
        .uri({
          scheme: ["http", "https"],
        })
        .allow(null)
        .message("Enter a valid website."),
      opensea: Joi.string()
        .pattern(/http(?:s)?:\/\/(?:www\.)?opensea\.io\/([a-zA-Z0-9_]+)/)

        .allow(null)
        .message("Enter a valid opensea link."),
      status: Joi.string()
        .valid("Sale is completed", "Sale is ongoing", "Sale is upcoming")
        .required()
        .messages({
          "any.only": "Choose an option",
          "string.base": "Choose an option",
        }),
      dropDate: Joi.date().allow(null),
      releaseDate: Joi.number().allow(null),
      address: Joi.number().allow(null),
      fee: Joi.string().valid("yes", "no").required().messages({
        "any.only": "Choose an option",
        "string.base": "Choose an option",
      }),
      extra: Joi.string().allow(null),
    });

    setErrors(
      schema
        .validate(data, { abortEarly: false })
        .error.details.reduce((acc, el) => {
          acc[el.context.label] = el.message;
          console.log(acc);
          return acc;
        }, {})
    );
    console.log(errors);
  };
  return (
    <div style={{ width: "80%", height: "100%", margin: "100px auto" }}>
      <Form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Form.Group required>
          <Form.Label> What are you looking for?</Form.Label>
          <Form.Check
            style={{ marginLeft: "13px" }}
            label="Get a project listed on Rarity Sniper"
            type="radio"
            name="lookingfor"
            value="rarity sniper"
            isInvalid={!!errors["lookingFor"]}
            onChange={(e) => {
              setOtherCheckbox(false);
              setData((pData) => ({ ...pData, lookingFor: e.target.value }));
              console.log(data);
            }}
          />
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              label="Other"
              type="radio"
              name="lookingfor"
              isInvalid={!!errors["lookingFor"]}
              aria-label="Checkbox for following text input"
              onChange={(e) => {
                setOtherCheckbox(e.target.checked);
                setData((pData) => ({ ...pData, lookingFor: null }));
              }}
            />
            <Form.Control
              placeholder="Other"
              disabled={!otherCheckBox}
              aria-label="Text input with checkbox"
              name="lookingfor"
              onChange={(e) =>
                setData((pData) => ({
                  ...pData,
                  lookingFor: e.target.value,
                }))
              }
              isInvalid={!!errors["lookingFor"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["lookingFor"]}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your email?</Form.Label>
          <Form.Control
            type="text"
            required
            isInvalid={!!errors["email"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, email: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["email"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label> What's your Discord username? (with #)</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["discordUser"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, discordUser: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["discordUser"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["name"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, name: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["name"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label> Project Description:</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["description"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, description: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["description"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Discord URL:</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["discordProject"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, discordProject: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["discordProject"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Twitter URL</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["twitter"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, twitter: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["twitter"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Website URL:</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["website"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, website: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["website"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project OpenSea URL</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["opensea"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, opensea: e.target.value }))
            }
          />

          <Form.Control.Feedback type="invalid">
            {errors["opensea"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          onChange={(e) =>
            setData((pData) => ({ ...pData, status: e.target.value }))
          }
        >
          <Form.Label>What's the status of your project?</Form.Label>
          <Form.Check
            type="radio"
            name="status"
            label="Sale is upcoming"
            value="Sale is upcoming"
          />
          <Form.Check
            type="radio"
            name="status"
            label="Sale is ongoing (not all items have been minted/revealed)"
            value="Sale is ongoing"
          />
          <Form.Check
            type="radio"
            name="status"
            label="Sale is completed (All NFTs are minted/revealed)"
            value="Sale is completed"
          />
          <Form.Control.Feedback type="invalid">
            {errors["status"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your project drop date?</Form.Label>
          <br />
          <DatePicker
            value={data.dropDate && new Date(data.dropDate)}
            onChange={(date) =>
              setData((pData) => ({
                ...pData,
                dropDate: date && date.getTime(),
              }))
            }
          />
          {errors["dropDate"]}
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your project reveal date?</Form.Label>
          <br />
          <DatePicker
            value={data.releaseDate && new Date(data.releaseDate)}
            onChange={(date) =>
              setData((pData) => ({
                ...pData,
                releaseDate: date && date.getTime(),
              }))
            }
          />
          {errors["releaseDate"]}
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your project contract address?</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["address"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, address: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["address"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          onChange={(e) =>
            setData((pData) => ({ ...pData, fee: e.target.value }))
          }
        >
          <Form.Label> Are you OK paying a small fee to get listed?</Form.Label>
          <Form.Check
            type="radio"
            name="fee"
            label="Yes"
            value="yes"
            isInvalid={!!errors["fee"]}
          />
          <Form.Check
            type="radio"
            name="fee"
            label="No"
            value="no"
            isInvalid={!!errors["fee"]}
            feedback={errors["fee"]}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Anything you would like to add?</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors["extra"]}
            onChange={(e) =>
              setData((pData) => ({ ...pData, extra: e.target.value }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors["extra"]}
          </Form.Control.Feedback>
        </Form.Group>
        <DarkPrimaryButton type="submit">Submit</DarkPrimaryButton>
      </Form>
    </div>
  );
};

export default GetListed;
