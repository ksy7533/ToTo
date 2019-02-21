<template>
    <div class="login">
        <h1>ToTo<br>(Today TodoList)</h1>
        <div class="wrap-box">
            <div class="row">
                <p class="title">
                    <label for="login">로그인</label>
                </p>
                <p class="wrap-input">
                    <input type="text" id="login">
                </p>
            </div>
            <div class="row">
                <p class="title">
                    <label for="password">패스워드</label>
                </p>
                <p class="wrap-input">
                    <input type="password" id="password">
                </p>
            </div>
            <div class="util">
                <button>로그인</button>
                <button>회원가입</button>
            </div>
            <p class="info">암호잘못입력했슈</p>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.login {
    margin: 120px auto 0; 
    width: 400px;
    height: 500px;
    background-color: #dbdbdb;
    border-radius: 4px;

    h1 {
        text-align: center;
        padding: 50px 0 20px 0;
        font-size: 30px;
        font-weight: bold;
    }

    .wrap-box {
        padding: 20px;

        .row {
            margin-top: 10px;

            &:first-child {
                margin-top: 0;
            }

            .title {
                margin-bottom: 10px;
                font-size: 22px;
            }

            .wrap-input {
                padding: 10px;

                input {
                    width: 100%;
                    height: 20px;
                    font-size: 18px;
                    border: 0;
                    outline: 0;
                }

                background-color: #fff;
                border-bottom: 2px solid #666;
            }
        }

        .util {
            text-align: center;
            margin-top: 40px;

            button {
                cursor: pointer;
                display: inline-block;
                margin: 0 5px;
                padding: 10px 20px;
                font-size: 18px;
                border: 0;
            }
        }

        .info {
            text-align: center;
            margin-top: 20px;
        }
    }
}
</style>

