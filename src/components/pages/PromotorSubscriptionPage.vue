<template>
    <section class="header">
        <div>
            <nav>
                <div class="nav-desktop">
                    <div class="logo">
                        <a class="smooth-scroll" href="https://www.codyepc.com/#top">
                            <img src="/logo.svg" alt="logo" />
                        </a>
                    </div>
                    <div class="nav-items-container">
                        <div class="nav-items">
                            <a class="smooth-scroll" href="https://www.codyepc.com/#for-who">Voor wie is Cody?</a>
                            <a class="smooth-scroll" href="https://www.codyepc.com/#how-it-works">Hoe werkt Cody?</a>
                        </div>
                        <div class="nav-button">
                            <a href="https://www.docs.codyepc.com/login">Meld je aan</a>
                        </div>
                        <div class="nav-hamburger">
                            <img src="/hamburger.svg" alt="Hamburger menu" />
                        </div>
                    </div>
                </div>
                <div class="nav-mobile-dropdown">
                    <div>
                        <a class="smooth-scroll" href="https://www.codyepc.com/#for-who">Voor wie is Cody?</a>
                    </div>
                    <div>
                        <a class="smooth-scroll" href="https://www.codyepc.com/#how-it-works">Hoe werkt Cody?</a>
                    </div>
                    <div class="nav-button">
                        <a href="https://www.docs.codyepc.com/login">Meld je aan</a>
                    </div>
                </div>
            </nav>
        </div>
    </section>
    <section class="form-container !mt-[97.22px] pt-[46px]">
        <div>
            <h1 class="text-title font-bold">Samenwerken met Cody?</h1>
            <p class="pt-[24px] pb-[12px]">Wilt u als bedrijf op onze app komen te staan? Word aanbevolen door ons bij renovaties binnen uw
                bedrijfsexpertise om meer klanten te bereiken! Bekijk de verschillende formules op onze website en dien
                hier je verzoek in. </p>
            <p><span class="font-bold">Heb je nog extra vragen?</span> Mail gerust naar <a href="mailto:vragen@cody.be"
                    class="text-primary-dark font-bold">vragen@cody.be</a>.</p>
        </div>
        <PromotorsForm class="mt-[40px]" />
    </section>
</template>

<script setup>
import PromotorsForm from "../forms/PromotorsForm.vue";

// when dom is loaded
document.addEventListener("DOMContentLoaded", function () {
    // get the hamburger menu
    const hamburger = document.querySelector(".nav-hamburger");
    // get the dropdown menu
    const dropdown = document.querySelector(".nav-mobile-dropdown");

    // add click event listener to the hamburger menu
    hamburger.addEventListener("click", function () {
        // toggle the class 'active' on the dropdown menu
        dropdown.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});
</script>

<style lang="scss">
.header {
    background-color: #FDFDFD;
    position: fixed;
    width: 100%;
    z-index: 999;
    margin-top: -99.72px;

    nav {
        .nav-desktop {
            display: flex;
            justify-content: space-between;
            max-width: 1420px;
            margin: 0 auto;
            padding: 20px 24px;

            @media (min-width: 768px) {
                padding: 20px 48px;
            }

            @media (min-width: 1024px) {
                padding: 20px 80px;
            }

            .logo {
                display: flex;
                align-items: center;
            }

            .nav-items-container {
                display: flex;
                gap: 40px;

                .nav-items {
                    display: none;
                    gap: 40px;
                    align-items: center;

                    @media (min-width: 824px) {
                        display: flex;
                    }

                    a {
                        font-weight: bold;
                        font-size: 16px;

                        @media (min-width: 1024px) {
                            font-size: 20px;
                        }
                    }
                }

                .nav-button {
                    border: 2px solid #0072FF;
                    border-radius: 5px;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    padding: 12px 48px;
                    transition: all 0.3s ease;
                    font-size: 20px;
                    font-weight: bold;

                    a {
                        color: #0072FF;
                    }

                    &:hover {
                        background-color: #0072FF;

                        a {
                            color: #FDFDFD;
                        }
                    }

                    @media (min-width: 824px) {
                        display: flex;
                    }
                }

                .nav-hamburger {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    @media (min-width: 824px) {
                        display: none;
                    }

                    img {
                        transition: transform 0.3s ease;
                    }

                    &.active {
                        img {
                            transform: rotate(90deg);
                        }
                    }
                }
            }
        }

        .nav-mobile-dropdown {
            display: none;
            transition: height 0.3s ease;

            &.active {
                display: block;
                height: auto;
            }

            div {
                padding: 16px 0;

                &:first-child {
                    margin-top: 12px;
                }

                &:nth-child(2) {
                    margin-bottom: 12px;
                }

                &:hover {
                    background-color: #9EBDFF;
                }

                &:last-child {
                    &:hover {
                        background-color: #FDFDFD;
                    }
                }

                a {
                    margin-left: 24px;
                    margin-right: 24px;
                    font-weight: bold;
                    font-size: 16px;

                    @media (min-width: 768px) {
                        margin-left: 48px;
                        margin-right: 48px;
                    }

                    @media (min-width: 1024px) {
                        margin-left: 80px;
                        margin-right: 80px;
                    }
                }
            }

            .nav-button {
                border: 2px solid #0072FF;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 12px 48px;
                transition: all 0.3s ease;
                cursor: pointer;
                margin-left: 24px;
                margin-right: 24px;
                margin-bottom: 24px;
                font-size: 16px;
                font-weight: bold;

                @media (min-width: 768px) {
                    margin-left: 48px;
                    margin-right: 48px;
                }

                @media (min-width: 1024px) {
                    margin-left: 80px;
                    margin-right: 80px;
                }

                a {
                    color: #0072FF;
                }
            }
        }
    }
}

.form-container {
    max-width: 840px;
    margin: 0 auto;
    padding: 20px 24px;
}
</style>