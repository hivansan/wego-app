import React, { useState } from "react";
import { FaWallet, FaUser } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import Accordion from "react-bootstrap/Accordion";

import UnlockModal from "../atoms/unlock/unlockModal";
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../constants";
import Store from "../stores/store";
import { useEffect } from "react";

const { emitter, store } = Store;

const RightMenu = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 520px)" });
  return (
    <>
      {isMobile ? (
        <div
        >
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header></Accordion.Header>
              <Accordion.Body>
                <div
                className='accordion'
                >
                  {children.map((x) => (
                    <>
                      <div style={{ margin: "10px" }}>{x}</div>
                      <hr />
                    </>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <div
          className="right-menu"
        >
          {children}
        </div>
      )}
    </>
  );
};

const Header = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    emitter.on(CONNECTION_CONNECTED, () => {
      setConnected(true);
      setAccount(store.getStore("account"));
    });
    emitter.on(CONNECTION_DISCONNECTED, () => {
      setConnected(false);
      setAccount(null);
    });
  }, []);

  return (
    <header
      className="header"
    >
      <div className="left-menu">
        <img
          src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"
          alt="opensea logo"
        />
        <img
          src={require("../assets/logo/blue&gray.png").default}
          alt=""
          className="logo"
        />
        {/* <div
          style={{
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            fontSize: "4vmin",
            marginLeft: "10px",
          }}
        >
          Wego
        </div> */}
      </div>

      {/* right menu */}
      <RightMenu>
        <a href="/marketplace">Marketplace</a>
        <a href="/analytics">Analytics</a>
        <a href="/getlisted">Get Listed</a>
        <a href="/stats">Stats</a>
        <div className='icons'>
          <FaUser size={28} className="header-icon" />
          <button
            style={{
              borderWidth: "0",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          >
            <FaWallet size={28} className="header-icon" />
          </button>
          {connected && (
            <span style={{ color: "black", fontSize: "10px" }}>
              {account?.address.substring(0, 8)}...
            </span>
          )}
          {modalOpen && (
            <UnlockModal
              closeModal={() => setModalOpen(false)}
              modalOpen={modalOpen}
            />
          )}
        </div>
      </RightMenu>
    </header>
  );
};

export default Header;
