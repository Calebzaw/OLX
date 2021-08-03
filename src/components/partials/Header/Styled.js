import styled from "styled-components";

export const HeaderArea = styled.div`
    height: 60px;
    background-color: #FFF;
    border: 1px solid #CCC;

    .container {
        max-width: 1000px;
        margin: auto;
        display: flex;
    }

    a {
        text-decoration: none;
    }

    .logo{
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;

        .logo1,
        .logo2,
        .logo3 {
            font-size: 27px;
            font-weight: bold;
        }
        .logo1 { color: #F00; }
        .logo2 { color: #0F0; }
        .logo3 { color: #00F; }
    }
`;