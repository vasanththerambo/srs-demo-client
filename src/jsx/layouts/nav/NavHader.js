import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";


const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? 
        (
          <Fragment>
		 
		  <svg width="201" height="54" viewBox="0 0 201 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.42 0.249999C14.06 0.249999 16.04 0.559999 17.36 1.18C18.68 1.78 19.34 2.75 19.34 4.09C19.34 5.41 18.93 6.42 18.11 7.12C17.31 7.8 16.39 8.14 15.35 8.14C14.31 8.14 13.37 7.88 12.53 7.36C11.71 6.82 11.14 6.11 10.82 5.23C10.08 5.23 9.37 5.48 8.69 5.98C8.03 6.46 7.61 7.09 7.43 7.87C11.39 8.83 14.23 9.95 15.95 11.23C17.67 12.51 18.53 14.15 18.53 16.15C18.53 18.15 17.62 19.75 15.8 20.95C14 22.15 11.56 22.75 8.48 22.75C5.42 22.75 3.25 22.33 1.97 21.49C0.69 20.65 0.05 19.54 0.05 18.16C0.05 16.78 0.48 15.51 1.34 14.35C1.76 15.25 2.56 16.06 3.74 16.78C4.94 17.5 6.12 17.86 7.28 17.86C9.42 17.86 10.78 17.18 11.36 15.82C8.04 15.38 5.51 14.46 3.77 13.06C2.03 11.64 1.16 9.93 1.16 7.93C1.16 6.59 1.52 5.4 2.24 4.36C2.96 3.3 3.88 2.49 5 1.93C7.2 0.809999 9.34 0.249999 11.42 0.249999ZM54.0763 0.249999C56.7163 0.249999 58.6963 0.559999 60.0163 1.18C61.3363 1.78 61.9963 2.75 61.9963 4.09C61.9963 5.41 61.5863 6.42 60.7663 7.12C59.9663 7.8 59.0463 8.14 58.0063 8.14C56.9663 8.14 56.0263 7.88 55.1863 7.36C54.3663 6.82 53.7963 6.11 53.4763 5.23C52.7363 5.23 52.0263 5.48 51.3463 5.98C50.6863 6.46 50.2663 7.09 50.0863 7.87C54.0463 8.83 56.8863 9.95 58.6062 11.23C60.3263 12.51 61.1863 14.15 61.1863 16.15C61.1863 18.15 60.2763 19.75 58.4563 20.95C56.6563 22.15 54.2163 22.75 51.1363 22.75C48.0763 22.75 45.9063 22.33 44.6263 21.49C43.3463 20.65 42.7063 19.54 42.7063 18.16C42.7063 16.78 43.1363 15.51 43.9963 14.35C44.4163 15.25 45.2163 16.06 46.3963 16.78C47.5963 17.5 48.7763 17.86 49.9363 17.86C52.0763 17.86 53.4363 17.18 54.0163 15.82C50.6963 15.38 48.1663 14.46 46.4263 13.06C44.6863 11.64 43.8163 9.93 43.8163 7.93C43.8163 6.59 44.1763 5.4 44.8963 4.36C45.6163 3.3 46.5363 2.49 47.6563 1.93C49.8563 0.809999 51.9963 0.249999 54.0763 0.249999ZM32.9241 46.78C31.6241 46.78 30.6941 46.41 30.1341 45.67C29.5741 44.91 29.2941 43.8 29.2941 42.34C29.2941 40.88 29.7641 37.52 30.7041 32.26H30.2241C29.0041 33.86 27.9941 35.77 27.1941 37.99C26.3941 40.21 25.9041 42.21 25.7241 43.99C24.7441 44.91 23.6141 45.37 22.3341 45.37C21.8141 45.37 21.3541 45.19 20.9541 44.83C20.5741 44.45 20.1941 43.8 19.8141 42.88C19.0741 41.02 18.5441 37.48 18.2241 32.26H17.7441C16.7641 36.56 16.2741 39.59 16.2741 41.35C16.2741 43.11 16.5741 44.47 17.1741 45.43C15.9741 46.33 14.7241 46.78 13.4241 46.78C12.1241 46.78 11.1941 46.41 10.6341 45.67C10.0741 44.91 9.79414 43.79 9.79414 42.31C9.79414 40.81 10.4241 36.58 11.6841 29.62L10.0941 26.41C12.3541 24.95 14.4141 24.22 16.2741 24.22C17.0941 24.22 17.7841 24.31 18.3441 24.49C18.9241 24.65 19.4741 24.97 19.9941 25.45C20.5341 25.93 20.9741 26.6 21.3141 27.46C22.0941 29.4 22.6541 32.23 22.9941 35.95H23.3541C24.3941 32.89 25.8341 30.26 27.6741 28.06C28.6741 26.88 29.8641 25.95 31.2441 25.27C32.6441 24.59 34.1541 24.25 35.7741 24.25C37.3141 24.25 38.0841 25.18 38.0841 27.04C38.0841 27.66 37.6941 29.97 36.9141 33.97C36.1541 37.95 35.7741 40.32 35.7741 41.08C35.7741 43.02 36.0741 44.47 36.6741 45.43C35.4741 46.33 34.2241 46.78 32.9241 46.78ZM51.8881 42.31L51.5881 42.16C51.0481 43.6 50.2681 44.73 49.2481 45.55C48.2481 46.35 47.1281 46.75 45.8881 46.75C44.1881 46.75 42.8281 46.11 41.8081 44.83C40.7881 43.55 40.2781 41.84 40.2781 39.7C40.2781 36.38 41.3881 33.6 43.6081 31.36C45.8481 29.12 48.6281 28 51.9481 28C52.8081 28 53.5981 28.08 54.3181 28.24C54.4381 28.8 54.5081 29.29 54.5281 29.71C55.5281 29.07 56.5581 28.75 57.6181 28.75C59.0781 28.75 59.8081 29.54 59.8081 31.12C59.8081 31.68 59.4881 33.37 58.8481 36.19C58.2281 39.01 57.9181 41.1 57.9181 42.46C57.9181 43.82 58.2281 44.76 58.8481 45.28C57.7281 46.26 56.5581 46.75 55.3381 46.75C54.1381 46.75 53.2581 46.39 52.6981 45.67C52.1581 44.95 51.8881 43.83 51.8881 42.31ZM45.9181 38.23C45.9181 39.21 46.1181 39.97 46.5181 40.51C46.9381 41.03 47.5281 41.29 48.2881 41.29C49.0481 41.29 49.7981 41.01 50.5381 40.45C51.2781 39.89 51.8981 39.12 52.3981 38.14C52.5781 36.12 52.9681 33.73 53.5681 30.97C51.5481 30.97 49.7681 31.7 48.2281 33.16C46.6881 34.62 45.9181 36.31 45.9181 38.23ZM63.178 35.17C63.038 34.61 62.968 34.09 62.968 33.61C62.968 32.63 63.258 31.89 63.838 31.39C64.418 30.89 65.168 30.64 66.088 30.64C66.088 29.6 65.818 28.47 65.278 27.25C66.258 26.53 67.148 25.99 67.948 25.63C68.768 25.25 69.628 25.06 70.528 25.06C71.428 25.06 72.048 25.23 72.388 25.57C72.748 25.89 72.928 26.39 72.928 27.07C72.928 27.75 72.788 28.81 72.508 30.25C73.308 30.13 74.118 29.96 74.938 29.74C75.078 30.16 75.148 30.7 75.148 31.36C75.148 32.02 74.888 32.64 74.368 33.22C73.868 33.78 73.128 34.06 72.148 34.06H71.698C70.978 37.32 70.618 39.83 70.618 41.59C70.618 43.35 70.928 44.58 71.548 45.28C70.428 46.26 69.238 46.75 67.978 46.75C66.718 46.75 65.808 46.38 65.248 45.64C64.708 44.88 64.438 43.71 64.438 42.13C64.438 41.17 64.788 38.65 65.488 34.57C64.688 34.71 63.918 34.91 63.178 35.17ZM77.0855 43.03C77.0855 42.23 77.2855 40.68 77.6855 38.38C78.1055 36.08 78.5355 33.98 78.9755 32.08L77.4155 29.68C79.9155 28.56 81.6655 28 82.6655 28C83.6855 28 84.1955 28.64 84.1955 29.92C84.1955 30.62 83.8655 32.08 83.2055 34.3L83.5055 34.45C84.9455 30.15 86.7355 28 88.8755 28C89.8555 28 90.6055 28.3 91.1255 28.9C91.6455 29.5 91.9055 30.17 91.9055 30.91C91.9055 32.01 91.4955 32.95 90.6755 33.73C89.8555 34.51 88.6255 34.9 86.9855 34.9C84.5055 34.9 83.2655 37.45 83.2655 42.55C83.2655 43.79 83.4755 44.7 83.8955 45.28C82.6555 46.26 81.5155 46.75 80.4755 46.75C78.2155 46.75 77.0855 45.51 77.0855 43.03ZM102.654 23.26C102.654 24.02 102.254 24.68 101.454 25.24C100.654 25.78 99.7445 26.05 98.7245 26.05C97.7045 26.05 96.8945 25.85 96.2945 25.45C95.7145 25.05 95.4245 24.51 95.4245 23.83C95.4245 22.91 95.8545 22.19 96.7145 21.67C97.5745 21.15 98.4845 20.89 99.4445 20.89C100.404 20.89 101.174 21.09 101.754 21.49C102.354 21.89 102.654 22.48 102.654 23.26ZM96.8045 46.75C95.5645 46.75 94.6645 46.44 94.1045 45.82C93.5445 45.2 93.2645 44.26 93.2645 43C93.2645 41.72 93.9045 38.31 95.1845 32.77L93.5045 30.25C96.0045 28.75 97.9745 28 99.4145 28C100.234 28 100.814 28.18 101.154 28.54C101.494 28.88 101.664 29.44 101.664 30.22C101.664 30.52 101.294 32.28 100.554 35.5C99.8145 38.72 99.4445 41.02 99.4445 42.4C99.4445 43.78 99.7545 44.74 100.374 45.28C99.2545 46.26 98.0645 46.75 96.8045 46.75ZM123.735 33.34L124.035 33.49C126.175 29.83 128.795 28 131.895 28C134.315 28 135.525 29.21 135.525 31.63C135.525 32.67 135.225 34.43 134.625 36.91C134.045 39.39 133.755 41.26 133.755 42.52C133.755 43.78 133.965 44.7 134.385 45.28C133.325 46.26 132.205 46.75 131.025 46.75C128.725 46.75 127.575 45.51 127.575 43.03C127.575 42.11 127.875 40.55 128.475 38.35C129.075 36.15 129.375 34.72 129.375 34.06C129.375 33.16 129.035 32.71 128.355 32.71C127.795 32.71 127.165 32.96 126.465 33.46C125.785 33.94 125.125 34.6 124.485 35.44C123.865 36.26 123.335 37.31 122.895 38.59C122.475 39.85 122.265 41.14 122.265 42.46C122.265 43.76 122.475 44.7 122.895 45.28C121.835 46.26 120.715 46.75 119.535 46.75C117.235 46.75 116.085 45.51 116.085 43.03C116.085 42.11 116.385 40.55 116.985 38.35C117.585 36.15 117.885 34.72 117.885 34.06C117.885 33.16 117.545 32.71 116.865 32.71C116.305 32.71 115.675 32.96 114.975 33.46C114.295 33.94 113.635 34.6 112.995 35.44C112.375 36.26 111.845 37.31 111.405 38.59C110.985 39.85 110.775 41.14 110.775 42.46C110.775 43.76 110.985 44.7 111.405 45.28C110.345 46.26 109.225 46.75 108.045 46.75C105.745 46.75 104.595 45.51 104.595 43.03C104.595 42.23 104.795 40.68 105.195 38.38C105.615 36.08 106.045 33.98 106.485 32.08L104.925 29.68C106.905 28.56 108.735 28 110.415 28C112.095 28 112.935 28.76 112.935 30.28C112.935 31.28 112.705 32.3 112.245 33.34L112.545 33.49C114.685 29.83 117.305 28 120.405 28C121.525 28 122.405 28.28 123.045 28.84C123.705 29.4 124.035 30.24 124.035 31.36C124.035 31.96 123.935 32.62 123.735 33.34ZM153.011 30.28C154.131 30.28 155.091 30.73 155.891 31.63C156.711 32.53 157.121 33.84 157.121 35.56C157.121 37.26 156.821 38.84 156.221 40.3C155.621 41.74 154.831 42.92 153.851 43.84C152.871 44.76 151.761 45.48 150.521 46C149.281 46.5 148.011 46.75 146.711 46.75C144.091 46.75 142.021 46.03 140.501 44.59C138.981 43.15 138.221 41.24 138.221 38.86C138.221 35.64 139.251 33.03 141.311 31.03C143.391 29.01 146.031 28 149.231 28C149.951 28 150.671 28.08 151.391 28.24C151.611 28.9 151.731 29.65 151.751 30.49C152.171 30.35 152.591 30.28 153.011 30.28ZM149.321 34.45C149.321 33.89 149.451 33.26 149.711 32.56C149.991 31.86 150.431 31.3 151.031 30.88C148.391 31.44 146.571 32.51 145.571 34.09C144.711 35.45 144.281 36.85 144.281 38.29C144.281 39.73 144.571 40.89 145.151 41.77C145.751 42.63 146.511 43.06 147.431 43.06C149.471 43.06 150.911 41.73 151.751 39.07C150.131 38.07 149.321 36.53 149.321 34.45ZM163.416 46.75C162.236 46.75 161.366 46.44 160.806 45.82C160.246 45.2 159.966 44.38 159.966 43.36C159.966 42.34 160.166 40.68 160.566 38.38C160.986 36.08 161.416 33.98 161.856 32.08L160.296 29.68C162.276 28.56 164.106 28 165.786 28C167.466 28 168.306 28.76 168.306 30.28C168.306 31.28 168.076 32.3 167.616 33.34L167.916 33.49C170.056 29.83 172.776 28 176.076 28C178.496 28 179.706 29.21 179.706 31.63C179.706 32.67 179.406 34.43 178.806 36.91C178.226 39.39 177.936 41.26 177.936 42.52C177.936 43.78 178.146 44.7 178.566 45.28C177.506 46.26 176.386 46.75 175.206 46.75C172.906 46.75 171.756 45.51 171.756 43.03C171.756 42.11 172.056 40.55 172.656 38.35C173.256 36.15 173.556 34.72 173.556 34.06C173.556 33.16 173.216 32.71 172.536 32.71C171.976 32.71 171.336 32.96 170.616 33.46C169.896 33.94 169.196 34.6 168.516 35.44C167.856 36.26 167.296 37.31 166.836 38.59C166.376 39.85 166.146 41.14 166.146 42.46C166.146 43.76 166.356 44.7 166.776 45.28C165.716 46.26 164.596 46.75 163.416 46.75ZM191.011 45.4C190.071 45.74 189.131 45.91 188.191 45.91C187.251 45.91 186.461 45.63 185.821 45.07C185.181 44.51 184.811 43.75 184.711 42.79C184.611 41.83 184.521 40.44 184.441 38.62C184.361 36.78 184.281 35.48 184.201 34.72C183.941 32.18 183.141 30.37 181.801 29.29C182.741 28.43 183.921 28 185.341 28C186.121 28 186.801 28.21 187.381 28.63C187.961 29.03 188.421 29.57 188.761 30.25C189.121 30.91 189.411 31.77 189.631 32.83C189.971 34.59 190.141 36.97 190.141 39.97C190.141 40.71 190.111 41.58 190.051 42.58H191.791C193.851 37.02 194.881 33.23 194.881 31.21C194.881 30.53 194.731 29.89 194.431 29.29C195.831 28.43 197.051 28 198.091 28C200.031 28 201.001 29.12 201.001 31.36C201.001 33.14 200.181 36.27 198.541 40.75C198.241 41.57 198.071 42.05 198.031 42.19C195.491 49.43 191.881 53.05 187.201 53.05C185.781 53.05 184.611 52.74 183.691 52.12C182.771 51.52 182.311 50.72 182.311 49.72C182.311 48.74 182.681 47.71 183.421 46.63C184.381 47.99 185.581 48.67 187.021 48.67C187.841 48.67 188.601 48.4 189.301 47.86C190.021 47.32 190.591 46.5 191.011 45.4Z" fill="black"/>
<path d="M32.4643 17.83L31.4143 14.8C30.3743 14.8 29.3243 14.64 28.2643 14.32C28.0443 15.6 27.9343 16.52 27.9343 17.08C27.9343 19.02 28.2343 20.47 28.8343 21.43C27.6343 22.33 26.3843 22.78 25.0843 22.78C23.7843 22.78 22.8543 22.41 22.2943 21.67C21.7343 20.91 21.4543 19.79 21.4543 18.31C21.4543 16.81 22.0843 12.58 23.3443 5.62L21.7543 2.41C23.9943 0.969999 26.0543 0.249999 27.9343 0.249999C29.3743 0.249999 30.4843 0.549999 31.2643 1.15C32.7643 0.549999 34.1143 0.249999 35.3143 0.249999C37.1543 0.249999 38.6143 0.869999 39.6943 2.11C40.7743 3.35 41.3143 4.84 41.3143 6.58C41.3143 7.88 40.9843 9.14 40.3243 10.36C39.6643 11.56 38.6943 12.54 37.4143 13.3C38.0943 15.24 38.8543 16.91 39.6943 18.31C40.5543 19.71 41.4043 20.64 42.2443 21.1C41.8243 21.54 41.1743 21.92 40.2943 22.24C39.4343 22.58 38.6543 22.75 37.9543 22.75C36.5943 22.75 35.5043 22.41 34.6843 21.73C33.8643 21.03 33.1243 19.73 32.4643 17.83ZM29.5843 11.05C31.1843 11.05 32.4243 10.64 33.3043 9.82C34.2043 9 34.6543 8.12 34.6543 7.18C34.6543 6.24 34.3943 5.49 33.8743 4.93C33.3543 4.37 32.6143 4.09 31.6543 4.09C31.1343 4.09 30.6143 4.16 30.0943 4.3C29.4543 8.12 29.0543 10.36 28.8943 11.02C29.0343 11.04 29.2643 11.05 29.5843 11.05Z" fill="white"/>
</svg>



          </Fragment>
        ) 
        : 
        (
          <Fragment>
		  
		  <svg width="201" height="54" viewBox="0 0 201 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.42 0.249999C14.06 0.249999 16.04 0.559999 17.36 1.18C18.68 1.78 19.34 2.75 19.34 4.09C19.34 5.41 18.93 6.42 18.11 7.12C17.31 7.8 16.39 8.14 15.35 8.14C14.31 8.14 13.37 7.88 12.53 7.36C11.71 6.82 11.14 6.11 10.82 5.23C10.08 5.23 9.37 5.48 8.69 5.98C8.03 6.46 7.61 7.09 7.43 7.87C11.39 8.83 14.23 9.95 15.95 11.23C17.67 12.51 18.53 14.15 18.53 16.15C18.53 18.15 17.62 19.75 15.8 20.95C14 22.15 11.56 22.75 8.48 22.75C5.42 22.75 3.25 22.33 1.97 21.49C0.69 20.65 0.05 19.54 0.05 18.16C0.05 16.78 0.48 15.51 1.34 14.35C1.76 15.25 2.56 16.06 3.74 16.78C4.94 17.5 6.12 17.86 7.28 17.86C9.42 17.86 10.78 17.18 11.36 15.82C8.04 15.38 5.51 14.46 3.77 13.06C2.03 11.64 1.16 9.93 1.16 7.93C1.16 6.59 1.52 5.4 2.24 4.36C2.96 3.3 3.88 2.49 5 1.93C7.2 0.809999 9.34 0.249999 11.42 0.249999ZM54.0763 0.249999C56.7163 0.249999 58.6963 0.559999 60.0163 1.18C61.3363 1.78 61.9963 2.75 61.9963 4.09C61.9963 5.41 61.5863 6.42 60.7663 7.12C59.9663 7.8 59.0463 8.14 58.0063 8.14C56.9663 8.14 56.0263 7.88 55.1863 7.36C54.3663 6.82 53.7963 6.11 53.4763 5.23C52.7363 5.23 52.0263 5.48 51.3463 5.98C50.6863 6.46 50.2663 7.09 50.0863 7.87C54.0463 8.83 56.8863 9.95 58.6062 11.23C60.3263 12.51 61.1863 14.15 61.1863 16.15C61.1863 18.15 60.2763 19.75 58.4563 20.95C56.6563 22.15 54.2163 22.75 51.1363 22.75C48.0763 22.75 45.9063 22.33 44.6263 21.49C43.3463 20.65 42.7063 19.54 42.7063 18.16C42.7063 16.78 43.1363 15.51 43.9963 14.35C44.4163 15.25 45.2163 16.06 46.3963 16.78C47.5963 17.5 48.7763 17.86 49.9363 17.86C52.0763 17.86 53.4363 17.18 54.0163 15.82C50.6963 15.38 48.1663 14.46 46.4263 13.06C44.6863 11.64 43.8163 9.93 43.8163 7.93C43.8163 6.59 44.1763 5.4 44.8963 4.36C45.6163 3.3 46.5363 2.49 47.6563 1.93C49.8563 0.809999 51.9963 0.249999 54.0763 0.249999ZM32.9241 46.78C31.6241 46.78 30.6941 46.41 30.1341 45.67C29.5741 44.91 29.2941 43.8 29.2941 42.34C29.2941 40.88 29.7641 37.52 30.7041 32.26H30.2241C29.0041 33.86 27.9941 35.77 27.1941 37.99C26.3941 40.21 25.9041 42.21 25.7241 43.99C24.7441 44.91 23.6141 45.37 22.3341 45.37C21.8141 45.37 21.3541 45.19 20.9541 44.83C20.5741 44.45 20.1941 43.8 19.8141 42.88C19.0741 41.02 18.5441 37.48 18.2241 32.26H17.7441C16.7641 36.56 16.2741 39.59 16.2741 41.35C16.2741 43.11 16.5741 44.47 17.1741 45.43C15.9741 46.33 14.7241 46.78 13.4241 46.78C12.1241 46.78 11.1941 46.41 10.6341 45.67C10.0741 44.91 9.79414 43.79 9.79414 42.31C9.79414 40.81 10.4241 36.58 11.6841 29.62L10.0941 26.41C12.3541 24.95 14.4141 24.22 16.2741 24.22C17.0941 24.22 17.7841 24.31 18.3441 24.49C18.9241 24.65 19.4741 24.97 19.9941 25.45C20.5341 25.93 20.9741 26.6 21.3141 27.46C22.0941 29.4 22.6541 32.23 22.9941 35.95H23.3541C24.3941 32.89 25.8341 30.26 27.6741 28.06C28.6741 26.88 29.8641 25.95 31.2441 25.27C32.6441 24.59 34.1541 24.25 35.7741 24.25C37.3141 24.25 38.0841 25.18 38.0841 27.04C38.0841 27.66 37.6941 29.97 36.9141 33.97C36.1541 37.95 35.7741 40.32 35.7741 41.08C35.7741 43.02 36.0741 44.47 36.6741 45.43C35.4741 46.33 34.2241 46.78 32.9241 46.78ZM51.8881 42.31L51.5881 42.16C51.0481 43.6 50.2681 44.73 49.2481 45.55C48.2481 46.35 47.1281 46.75 45.8881 46.75C44.1881 46.75 42.8281 46.11 41.8081 44.83C40.7881 43.55 40.2781 41.84 40.2781 39.7C40.2781 36.38 41.3881 33.6 43.6081 31.36C45.8481 29.12 48.6281 28 51.9481 28C52.8081 28 53.5981 28.08 54.3181 28.24C54.4381 28.8 54.5081 29.29 54.5281 29.71C55.5281 29.07 56.5581 28.75 57.6181 28.75C59.0781 28.75 59.8081 29.54 59.8081 31.12C59.8081 31.68 59.4881 33.37 58.8481 36.19C58.2281 39.01 57.9181 41.1 57.9181 42.46C57.9181 43.82 58.2281 44.76 58.8481 45.28C57.7281 46.26 56.5581 46.75 55.3381 46.75C54.1381 46.75 53.2581 46.39 52.6981 45.67C52.1581 44.95 51.8881 43.83 51.8881 42.31ZM45.9181 38.23C45.9181 39.21 46.1181 39.97 46.5181 40.51C46.9381 41.03 47.5281 41.29 48.2881 41.29C49.0481 41.29 49.7981 41.01 50.5381 40.45C51.2781 39.89 51.8981 39.12 52.3981 38.14C52.5781 36.12 52.9681 33.73 53.5681 30.97C51.5481 30.97 49.7681 31.7 48.2281 33.16C46.6881 34.62 45.9181 36.31 45.9181 38.23ZM63.178 35.17C63.038 34.61 62.968 34.09 62.968 33.61C62.968 32.63 63.258 31.89 63.838 31.39C64.418 30.89 65.168 30.64 66.088 30.64C66.088 29.6 65.818 28.47 65.278 27.25C66.258 26.53 67.148 25.99 67.948 25.63C68.768 25.25 69.628 25.06 70.528 25.06C71.428 25.06 72.048 25.23 72.388 25.57C72.748 25.89 72.928 26.39 72.928 27.07C72.928 27.75 72.788 28.81 72.508 30.25C73.308 30.13 74.118 29.96 74.938 29.74C75.078 30.16 75.148 30.7 75.148 31.36C75.148 32.02 74.888 32.64 74.368 33.22C73.868 33.78 73.128 34.06 72.148 34.06H71.698C70.978 37.32 70.618 39.83 70.618 41.59C70.618 43.35 70.928 44.58 71.548 45.28C70.428 46.26 69.238 46.75 67.978 46.75C66.718 46.75 65.808 46.38 65.248 45.64C64.708 44.88 64.438 43.71 64.438 42.13C64.438 41.17 64.788 38.65 65.488 34.57C64.688 34.71 63.918 34.91 63.178 35.17ZM77.0855 43.03C77.0855 42.23 77.2855 40.68 77.6855 38.38C78.1055 36.08 78.5355 33.98 78.9755 32.08L77.4155 29.68C79.9155 28.56 81.6655 28 82.6655 28C83.6855 28 84.1955 28.64 84.1955 29.92C84.1955 30.62 83.8655 32.08 83.2055 34.3L83.5055 34.45C84.9455 30.15 86.7355 28 88.8755 28C89.8555 28 90.6055 28.3 91.1255 28.9C91.6455 29.5 91.9055 30.17 91.9055 30.91C91.9055 32.01 91.4955 32.95 90.6755 33.73C89.8555 34.51 88.6255 34.9 86.9855 34.9C84.5055 34.9 83.2655 37.45 83.2655 42.55C83.2655 43.79 83.4755 44.7 83.8955 45.28C82.6555 46.26 81.5155 46.75 80.4755 46.75C78.2155 46.75 77.0855 45.51 77.0855 43.03ZM102.654 23.26C102.654 24.02 102.254 24.68 101.454 25.24C100.654 25.78 99.7445 26.05 98.7245 26.05C97.7045 26.05 96.8945 25.85 96.2945 25.45C95.7145 25.05 95.4245 24.51 95.4245 23.83C95.4245 22.91 95.8545 22.19 96.7145 21.67C97.5745 21.15 98.4845 20.89 99.4445 20.89C100.404 20.89 101.174 21.09 101.754 21.49C102.354 21.89 102.654 22.48 102.654 23.26ZM96.8045 46.75C95.5645 46.75 94.6645 46.44 94.1045 45.82C93.5445 45.2 93.2645 44.26 93.2645 43C93.2645 41.72 93.9045 38.31 95.1845 32.77L93.5045 30.25C96.0045 28.75 97.9745 28 99.4145 28C100.234 28 100.814 28.18 101.154 28.54C101.494 28.88 101.664 29.44 101.664 30.22C101.664 30.52 101.294 32.28 100.554 35.5C99.8145 38.72 99.4445 41.02 99.4445 42.4C99.4445 43.78 99.7545 44.74 100.374 45.28C99.2545 46.26 98.0645 46.75 96.8045 46.75ZM123.735 33.34L124.035 33.49C126.175 29.83 128.795 28 131.895 28C134.315 28 135.525 29.21 135.525 31.63C135.525 32.67 135.225 34.43 134.625 36.91C134.045 39.39 133.755 41.26 133.755 42.52C133.755 43.78 133.965 44.7 134.385 45.28C133.325 46.26 132.205 46.75 131.025 46.75C128.725 46.75 127.575 45.51 127.575 43.03C127.575 42.11 127.875 40.55 128.475 38.35C129.075 36.15 129.375 34.72 129.375 34.06C129.375 33.16 129.035 32.71 128.355 32.71C127.795 32.71 127.165 32.96 126.465 33.46C125.785 33.94 125.125 34.6 124.485 35.44C123.865 36.26 123.335 37.31 122.895 38.59C122.475 39.85 122.265 41.14 122.265 42.46C122.265 43.76 122.475 44.7 122.895 45.28C121.835 46.26 120.715 46.75 119.535 46.75C117.235 46.75 116.085 45.51 116.085 43.03C116.085 42.11 116.385 40.55 116.985 38.35C117.585 36.15 117.885 34.72 117.885 34.06C117.885 33.16 117.545 32.71 116.865 32.71C116.305 32.71 115.675 32.96 114.975 33.46C114.295 33.94 113.635 34.6 112.995 35.44C112.375 36.26 111.845 37.31 111.405 38.59C110.985 39.85 110.775 41.14 110.775 42.46C110.775 43.76 110.985 44.7 111.405 45.28C110.345 46.26 109.225 46.75 108.045 46.75C105.745 46.75 104.595 45.51 104.595 43.03C104.595 42.23 104.795 40.68 105.195 38.38C105.615 36.08 106.045 33.98 106.485 32.08L104.925 29.68C106.905 28.56 108.735 28 110.415 28C112.095 28 112.935 28.76 112.935 30.28C112.935 31.28 112.705 32.3 112.245 33.34L112.545 33.49C114.685 29.83 117.305 28 120.405 28C121.525 28 122.405 28.28 123.045 28.84C123.705 29.4 124.035 30.24 124.035 31.36C124.035 31.96 123.935 32.62 123.735 33.34ZM153.011 30.28C154.131 30.28 155.091 30.73 155.891 31.63C156.711 32.53 157.121 33.84 157.121 35.56C157.121 37.26 156.821 38.84 156.221 40.3C155.621 41.74 154.831 42.92 153.851 43.84C152.871 44.76 151.761 45.48 150.521 46C149.281 46.5 148.011 46.75 146.711 46.75C144.091 46.75 142.021 46.03 140.501 44.59C138.981 43.15 138.221 41.24 138.221 38.86C138.221 35.64 139.251 33.03 141.311 31.03C143.391 29.01 146.031 28 149.231 28C149.951 28 150.671 28.08 151.391 28.24C151.611 28.9 151.731 29.65 151.751 30.49C152.171 30.35 152.591 30.28 153.011 30.28ZM149.321 34.45C149.321 33.89 149.451 33.26 149.711 32.56C149.991 31.86 150.431 31.3 151.031 30.88C148.391 31.44 146.571 32.51 145.571 34.09C144.711 35.45 144.281 36.85 144.281 38.29C144.281 39.73 144.571 40.89 145.151 41.77C145.751 42.63 146.511 43.06 147.431 43.06C149.471 43.06 150.911 41.73 151.751 39.07C150.131 38.07 149.321 36.53 149.321 34.45ZM163.416 46.75C162.236 46.75 161.366 46.44 160.806 45.82C160.246 45.2 159.966 44.38 159.966 43.36C159.966 42.34 160.166 40.68 160.566 38.38C160.986 36.08 161.416 33.98 161.856 32.08L160.296 29.68C162.276 28.56 164.106 28 165.786 28C167.466 28 168.306 28.76 168.306 30.28C168.306 31.28 168.076 32.3 167.616 33.34L167.916 33.49C170.056 29.83 172.776 28 176.076 28C178.496 28 179.706 29.21 179.706 31.63C179.706 32.67 179.406 34.43 178.806 36.91C178.226 39.39 177.936 41.26 177.936 42.52C177.936 43.78 178.146 44.7 178.566 45.28C177.506 46.26 176.386 46.75 175.206 46.75C172.906 46.75 171.756 45.51 171.756 43.03C171.756 42.11 172.056 40.55 172.656 38.35C173.256 36.15 173.556 34.72 173.556 34.06C173.556 33.16 173.216 32.71 172.536 32.71C171.976 32.71 171.336 32.96 170.616 33.46C169.896 33.94 169.196 34.6 168.516 35.44C167.856 36.26 167.296 37.31 166.836 38.59C166.376 39.85 166.146 41.14 166.146 42.46C166.146 43.76 166.356 44.7 166.776 45.28C165.716 46.26 164.596 46.75 163.416 46.75ZM191.011 45.4C190.071 45.74 189.131 45.91 188.191 45.91C187.251 45.91 186.461 45.63 185.821 45.07C185.181 44.51 184.811 43.75 184.711 42.79C184.611 41.83 184.521 40.44 184.441 38.62C184.361 36.78 184.281 35.48 184.201 34.72C183.941 32.18 183.141 30.37 181.801 29.29C182.741 28.43 183.921 28 185.341 28C186.121 28 186.801 28.21 187.381 28.63C187.961 29.03 188.421 29.57 188.761 30.25C189.121 30.91 189.411 31.77 189.631 32.83C189.971 34.59 190.141 36.97 190.141 39.97C190.141 40.71 190.111 41.58 190.051 42.58H191.791C193.851 37.02 194.881 33.23 194.881 31.21C194.881 30.53 194.731 29.89 194.431 29.29C195.831 28.43 197.051 28 198.091 28C200.031 28 201.001 29.12 201.001 31.36C201.001 33.14 200.181 36.27 198.541 40.75C198.241 41.57 198.071 42.05 198.031 42.19C195.491 49.43 191.881 53.05 187.201 53.05C185.781 53.05 184.611 52.74 183.691 52.12C182.771 51.52 182.311 50.72 182.311 49.72C182.311 48.74 182.681 47.71 183.421 46.63C184.381 47.99 185.581 48.67 187.021 48.67C187.841 48.67 188.601 48.4 189.301 47.86C190.021 47.32 190.591 46.5 191.011 45.4Z" fill="black"/>
<path d="M32.4643 17.83L31.4143 14.8C30.3743 14.8 29.3243 14.64 28.2643 14.32C28.0443 15.6 27.9343 16.52 27.9343 17.08C27.9343 19.02 28.2343 20.47 28.8343 21.43C27.6343 22.33 26.3843 22.78 25.0843 22.78C23.7843 22.78 22.8543 22.41 22.2943 21.67C21.7343 20.91 21.4543 19.79 21.4543 18.31C21.4543 16.81 22.0843 12.58 23.3443 5.62L21.7543 2.41C23.9943 0.969999 26.0543 0.249999 27.9343 0.249999C29.3743 0.249999 30.4843 0.549999 31.2643 1.15C32.7643 0.549999 34.1143 0.249999 35.3143 0.249999C37.1543 0.249999 38.6143 0.869999 39.6943 2.11C40.7743 3.35 41.3143 4.84 41.3143 6.58C41.3143 7.88 40.9843 9.14 40.3243 10.36C39.6643 11.56 38.6943 12.54 37.4143 13.3C38.0943 15.24 38.8543 16.91 39.6943 18.31C40.5543 19.71 41.4043 20.64 42.2443 21.1C41.8243 21.54 41.1743 21.92 40.2943 22.24C39.4343 22.58 38.6543 22.75 37.9543 22.75C36.5943 22.75 35.5043 22.41 34.6843 21.73C33.8643 21.03 33.1243 19.73 32.4643 17.83ZM29.5843 11.05C31.1843 11.05 32.4243 10.64 33.3043 9.82C34.2043 9 34.6543 8.12 34.6543 7.18C34.6543 6.24 34.3943 5.49 33.8743 4.93C33.3543 4.37 32.6143 4.09 31.6543 4.09C31.1343 4.09 30.6143 4.16 30.0943 4.3C29.4543 8.12 29.0543 10.36 28.8943 11.02C29.0343 11.04 29.2643 11.05 29.5843 11.05Z" fill="white"/>
</svg>



          </Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
