import React, { useState } from "react";
import { BiWalletAlt } from "react-icons/bi";

import UnlockModal from "../atoms/unlock/unlockModal";
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../constants";
import Store from "../stores/store";

const { emitter, store } = Store;

const Header = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  emitter.on(CONNECTION_CONNECTED, () => {
    setConnected(true);
    setAccount(store.getStore("account"));
  });
  emitter.on(CONNECTION_DISCONNECTED, () => {
    setConnected(false);
    setAccount(null);
  });

  return (
    <header
      style={{
        position: "sticky",
        width: "100%",
        height: "70px",
        backgroundColor: "white",
        boxShadow: "0px 0px 5px black",
        top: 0,
        zIndex: "200",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ margin: "1em", display: "flex", flexDirection: "row" }}>
        <img
          src={require("../assets/logo/blue&gray.png").default}
          alt=""
          style={{ width: "auto", height: "40px" }}
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
      <div
        style={{
          margin: "auto 1em",
          fontWeight: "bolder",
          display: "flex",
          flexDirection: "row",
          gap: "5vw",
        }}
      >
        <a
          href="/marketplace"
          style={{ textDecoration: "none", color: "black", margin: "auto 0" }}
        >
          Marketplace
        </a>
        <a
          href="/stats"
          style={{ textDecoration: "none", color: "black", margin: "auto 0" }}
        >
          Stats
        </a>
        <a
          href="/getlisted"
          style={{ textDecoration: "none", color: "black", margin: "auto 0" }}
        >
          Get Listed
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{
              borderWidth: "0",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          >
            <BiWalletAlt size={24} />
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
      </div>
    </header>
  );
};

export default Header;