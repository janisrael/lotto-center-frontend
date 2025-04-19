<template>
<div class="card z-index-2">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
        <div class="border-radius-lg py-3 pe-1" :class="[`bg-gradient-${color} shadow-${color}`,typeColorClass,'pill-wrapper']">
            <slot />

            <div class="row" style="padding: 10px;">
                <div class="col-lg-4 col-md-6 pill-item-col">
                    <div class="pills-container">
                        <img       
                            :class="(type === 'dailygrand' || type === 'lotto649-western') ? 'pill-logo-dg' : 'pill-logo'" 
                            :src="getLogo" 
                            />
                        <p class="text-color-white pill-date text-shadow-on">
                            {{ getDrawDate }}
                        </p>
                    </div>
                </div>
                <div class="col pill-item-col">
                    <div class="pills-container">

                        <h4 class="text-color-white text-shadow-on">{{ title }}</h4>
                        <h1 v-if="type === 'dailygrand'" class="text-color-white text-shadow-on card-prize">
                            $ {{ jackpot }} <span class="prize-small-word">per day for life,</span>
                            <p class="prize-small-word">or a lump sum of <strong style="font-size: 26px;">$ 7,000,000</strong></p>
                        </h1>
                        <h1 v-else class="text-color-white text-shadow-on card-prize"> {{ currencyFormater(jackpot) }} <span class="small-text">EST.</span></h1>
                        
                        <h3></h3>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="card-body">

        <div class="row">
            <div class="col-lg-4 col-md-12">
                <div class="pills-container">
                    <h6 class="mb-0 ">{{ next_draw }}</h6>
                    <h4 class="mb-2 card-next-draw" v-html="subtitle"></h4>
                    <div class="d-flex flex-center">
                        <i class="material-icons text-sm my-auto me-1">schedule</i>
                        <p class="mb-0 text-sm p-default ">{{ update }}</p>
                    </div>
                </div>
                
            </div>
            <div class="col">
                <div class="vertical-line"></div>
                <div class="pills-container">

                    <div class="d-flex flex-center">
                        <div style="margin-right: 20px;">
                            <material-badge variant="gradient" class="count-down-item">{{ getCountDown.days }}</material-badge>
                            <div class="count-down-label">Days</div>
                        </div>
                        <div style="margin-right: 20px;">
                            <material-badge variant="gradient" class="count-down-item">{{ getCountDown.hours }}</material-badge>
                            <div class="count-down-label">Hours</div>
                        </div>
                        <div style="margin-right: 20px;">
                            <material-badge variant="gradient" class="count-down-item">{{ getCountDown.minutes }}</material-badge>
                            <div class="count-down-label">Mins</div>
                        </div>
                        <div style="margin-right: 20px;">
                            <material-badge variant="gradient" class="count-down-item">{{ getCountDown.seconds }}</material-badge>
                            <div class="count-down-label">Secs</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <!--  eslint-disable-next-line vue/no-v-html -->

        <!-- <hr class="dark horizontal" /> -->
        <!-- <div class="d-flex">
          <i class="material-icons text-sm my-auto me-1">schedule</i>
          <p class="mb-0 text-sm">{{ update }}</p>
        </div> -->
    </div>
</div>
</template>

  
<script>
import logo_lm from "@/assets/img/Lotto_Max_logo.png";
import logo_649 from "@/assets/img/Lotto_649_logo.png";
import logo_dg from "@/assets/img/Daily_Grand_logo.png";
import logo_lm_w from "@/assets/img/Western_Max_logo.png";
import logo_649_w from "@/assets/img/Western_649_logo.png";
import MaterialBadge from "@/components/MaterialBadge.vue";
export default {
    name: "GameHolderCard",
    components: {
        MaterialBadge
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        subtitle: {
            type: String,
            default: "",
        },
        update: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "primary",
        },
        type: {
            type: String,
            default: "primary",
        },
        jackpot: {
            type: String,
            default: "0",
        },
        next_draw: {
            type: String,
            default: "-",
        },
    },
    data() {
        return {
            logo_lm,
            logo_649,
            logo_dg,
            logo_lm_w,
            logo_649_w,
            countdownLottoMax: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            countdownLotto649: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            countdownLottoDG: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            nextDrawLottoMaxDate: '',
            nextDrawLotto649Date: '',
            nextDrawLottoDG: '',
            timer: null,


        }
    },
    computed: {
       // Format countdown values to always be two digits for Lotto Max

        getCountDown() {
            if (this.type === 'lottomax' || this.type === 'lottomax-western') {
                return {
                    days: String(this.countdownLottoMax.days).padStart(2, '0'),
                    hours: String(this.countdownLottoMax.hours).padStart(2, '0'),
                    minutes: String(this.countdownLottoMax.minutes).padStart(2, '0'),
                    seconds: String(this.countdownLottoMax.seconds).padStart(2, '0'),
                };
            }

            if (this.type === 'lotto649' || this.type === 'lotto649-western') {
                return {
                    days: String(this.countdownLotto649.days).padStart(2, '0'),
                    hours: String(this.countdownLotto649.hours).padStart(2, '0'),
                    minutes: String(this.countdownLotto649.minutes).padStart(2, '0'),
                    seconds: String(this.countdownLotto649.seconds).padStart(2, '0'),
                };
            }

            if (this.type === 'dailygrand') {
                return {
                    days: String(this.countdownLottoDG.days).padStart(2, '0'),
                    hours: String(this.countdownLottoDG.hours).padStart(2, '0'),
                    minutes: String(this.countdownLottoDG.minutes).padStart(2, '0'),
                    seconds: String(this.countdownLottoDG.seconds).padStart(2, '0'),
                };
            }

            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
            };
        },
        formattedCountdownLottoMax() {
            return {
                days: String(this.countdownLottoMax.days).padStart(2, '0'),
                hours: String(this.countdownLottoMax.hours).padStart(2, '0'),
                minutes: String(this.countdownLottoMax.minutes).padStart(2, '0'),
                seconds: String(this.countdownLottoMax.seconds).padStart(2, '0'),
            };
        },
        // Format countdown values to always be two digits for Lotto 649
        formattedCountdownLotto649() {
            return {
                days: String(this.countdownLotto649.days).padStart(2, '0'),
                hours: String(this.countdownLotto649.hours).padStart(2, '0'),
                minutes: String(this.countdownLotto649.minutes).padStart(2, '0'),
                seconds: String(this.countdownLotto649.seconds).padStart(2, '0'),
            };
        },
        typeColorClass() {
            const classMap = {
                'lottomax': 'lotto-max-color',
                'lotto649': 'lotto-649-color',
                'dailygrand': 'lotto-dailygrand-color',
                'lottomax-western': 'lotto-max-western-color',
                'lotto649-western': 'lotto-649-western-color',
            };
            return classMap[this.type] || 'default-color';
        },
        getLogo() {
            const classMap = {
                'lottomax': this.logo_lm,
                'lotto649': this.logo_649,
                'dailygrand': this.logo_dg,
                'lottomax-western': this.logo_lm_w,
                'lotto649-western': this.logo_649_w
            };
            return classMap[this.type] || this.logo_649;
        },
        getDrawDate() {
            
            const classMap = {
                'lottomax': this.nextDrawLottoMaxDate,
                'lotto649': this.nextDrawLotto649Date,
                'dailygrand': this.nextDrawLottoDG,
                'lottomax-western': this.nextDrawLottoMaxDate,
                'lotto649-western': this.nextDrawLotto649Date
            };
            
            return classMap[this.type] || this.nextDrawLottoMaxDate;
        }
    },
    mounted() {
        this.updateCountdown();
        this.timer = setInterval(this.updateCountdown, 1000); // Update every second
    },
    beforeUnmount() {
        clearInterval(this.timer); // Clear the interval when component is destroyed
    },

    methods: {
        currencyFormater(value) {
            console.log(value)
            const formattedCurrency = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);
            return formattedCurrency
        },
        getNextDailyGrandDraw() {
            const now = new Date();

            // Adjust to Alberta time (Daylight Saving Time-safe)
            const albertaOffset = -6; // Alberta is UTC-6 (or -7 depending on DST)
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const albertaNow = new Date(utc + 3600000 * albertaOffset);

            const drawDays = [1, 4]; // Tuesday (2), Friday (5)
            const nextDraw = new Date(albertaNow);
            nextDraw.setHours(22, 30, 0, 0); // 10:30 PM

            // If today isn't a draw day or draw time has passed, loop to find next
            while (
                nextDraw <= albertaNow ||
                !drawDays.includes(nextDraw.getDay())
            ) {
                nextDraw.setDate(nextDraw.getDate() + 1);
            }

            // Format next draw date as "Friday April 18, 2025"
            this.nextDrawLottoDG = `${nextDraw.toLocaleString('en-US', { weekday: 'long' })} ${nextDraw.toLocaleString('en-US', { month: 'long' })} ${nextDraw.getDate()}, ${nextDraw.getFullYear()}`;

            return nextDraw;
        },
        getNextLottoMaxDraw() {
            const now = new Date();

            // Adjust to Alberta time (Daylight Saving Time-safe)
            const albertaOffset = -6; // Alberta is UTC-6 (or -7 depending on DST)
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const albertaNow = new Date(utc + 3600000 * albertaOffset);

            const drawDays = [2, 5]; // Tuesday (2), Friday (5)
            const nextDraw = new Date(albertaNow);
            nextDraw.setHours(22, 30, 0, 0); // 10:30 PM

            // If today isn't a draw day or draw time has passed, loop to find next
            while (
                nextDraw <= albertaNow ||
                !drawDays.includes(nextDraw.getDay())
            ) {
                nextDraw.setDate(nextDraw.getDate() + 1);
            }

            // Format next draw date as "Friday April 18, 2025"
            this.nextDrawLottoMaxDate = `${nextDraw.toLocaleString('en-US', { weekday: 'long' })} ${nextDraw.toLocaleString('en-US', { month: 'long' })} ${nextDraw.getDate()}, ${nextDraw.getFullYear()}`;

            return nextDraw;
        },
        getNextLotto649Draw() {
            const now = new Date();

            // Adjust to Alberta time (Daylight Saving Time-safe)
            const albertaOffset = -6; // Alberta is UTC-6 (or -7 depending on DST)
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const albertaNow = new Date(utc + 3600000 * albertaOffset);

            const drawDays = [3, 6]; // Wednesday (3), Saturday (6)
            const nextDraw = new Date(albertaNow);
            nextDraw.setHours(22, 30, 0, 0); // 10:30 PM

            // If today isn't a draw day or draw time has passed, loop to find next
            while (
                nextDraw <= albertaNow ||
                !drawDays.includes(nextDraw.getDay())
            ) {
                nextDraw.setDate(nextDraw.getDate() + 1);
            }

            // Format next draw date as "Saturday April 19, 2025"
            this.nextDrawLotto649Date = `${nextDraw.toLocaleString('en-US', { weekday: 'long' })} ${nextDraw.toLocaleString('en-US', { month: 'long' })} ${nextDraw.getDate()}, ${nextDraw.getFullYear()}`;

            return nextDraw;
        },
        updateCountdown() {
            const now = new Date();
            const nextDrawLottoMax = this.getNextLottoMaxDraw();
            const nextDrawLotto649 = this.getNextLotto649Draw();
            const nextDrawDailyGrand = this.getNextDailyGrandDraw();

            // Lotto Max Countdown
            const diffLottoMax = nextDrawLottoMax - now;
            this.countdownLottoMax.days = Math.floor(diffLottoMax / (1000 * 60 * 60 * 24));
            this.countdownLottoMax.hours = Math.floor((diffLottoMax / (1000 * 60 * 60)) % 24);
            this.countdownLottoMax.minutes = Math.floor((diffLottoMax / (1000 * 60)) % 60);
            this.countdownLottoMax.seconds = Math.floor((diffLottoMax / 1000) % 60);

            // Lotto 649 Countdown
            const diffLotto649 = nextDrawLotto649 - now;
            this.countdownLotto649.days = Math.floor(diffLotto649 / (1000 * 60 * 60 * 24));
            this.countdownLotto649.hours = Math.floor((diffLotto649 / (1000 * 60 * 60)) % 24);
            this.countdownLotto649.minutes = Math.floor((diffLotto649 / (1000 * 60)) % 60);
            this.countdownLotto649.seconds = Math.floor((diffLotto649 / 1000) % 60);

            // Lotto Daily grand
            const diffLottoDG = nextDrawDailyGrand - now;
            this.countdownLottoDG.days = Math.floor(diffLottoDG / (1000 * 60 * 60 * 24));
            this.countdownLottoDG.hours = Math.floor((diffLottoDG / (1000 * 60 * 60)) % 24);
            this.countdownLottoDG.minutes = Math.floor((diffLottoDG / (1000 * 60)) % 60);
            this.countdownLottoDG.seconds = Math.floor((diffLottoDG / 1000) % 60);
        }
    },
};
</script>
