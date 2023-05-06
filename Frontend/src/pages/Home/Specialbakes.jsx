import React from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { RiWhatsappFill, RiInstagramLine } from "react-icons/ri";
import { BsDiscord } from "react-icons/bs";

const Specialbakes = () => {
    return (
        <div className="specialBakes">
            <div className="specialBakesCard">
                <div className="sbContact">
                    <div className="sbTxt">
                        <h2 className="sbTitle">Special Bakes</h2>
                        <p className="sbDescription">Looking for something unique? Get in touch with our customer satisfactory specialist for a fully customized experience.</p>
                        {/* <h4 className="sbSubtitle"><b>Hello Belly!</b></h4> */}
                    </div>
                    <div className="sbBtns">
                        <a href="tel:+2349029383837" target="_blank" rel="noreferrer" className="sbBtnPhone sbBtn">
                            <MdPhone />&nbsp; Call
                        </a>
                        <a href="https://wa.me/2349029383837" target="_blank" rel="noreferrer" className="sbBtnWhatsapp sbBtn">
                            <RiWhatsappFill />&nbsp; Chat
                        </a>
                        <a href="mailto:bellycakeshop@gmail.com" target="_blank" rel="noreferrer" className="sbBtnEmail sbBtn">
                            <MdMail />&nbsp; Mail
                        </a>
                        <a href="https://discord.gg/JApyb92YTu" target="_blank" rel="noreferrer" className="sbBtnDiscord sbBtn">
                            <BsDiscord />&nbsp; Team
                        </a>
                        <a href="https://www.instagram.com/bellycakeshop" target="_blank" rel="noreferrer" className="sbBtnInstagram sbBtn">
                            <RiInstagramLine />&nbsp; Follow
                        </a>
                    </div>
                </div>
                <div className="sbImgBox">
                    <img src="/assets/hello.jpg" alt="hello" className="sbImg" />
                </div>
            </div>
        </div>
    )
};

export default Specialbakes;