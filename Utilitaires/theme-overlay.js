if (String(new URL(document.location.href).searchParams.get("themeOverlay") || "").toLowerCase() != "false") window.addEventListener("DOMContentLoaded", function () {
    const emojis = {
        dark: "🌚",
        light: "🌞"
    }, style = document.createElement("style");
    function setStyle (scaleValue) {
        style.textContent = `
            :root {
                --scale-value: ${String(scaleValue || "") || "1"}
            }
            @keyframes spin-out {
                0% {
                    transform: rotate(0deg) scale(var(--scale-value))
                }
                100% {
                    transform: rotate(360deg) scale(var(--scale-value))
                }
            }
            @keyframes spin-in {
                0% {
                    transform: rotate(360deg) scale(var(--scale-value))
                }
                100% {
                    transform: rotate(0deg) scale(var(--scale-value))
                }
            }
            .spin-out {
                animation: spin-out 0.5s forwards
            }
            .spin-in {
                animation: spin-in 0.5s forwards
            }
        `
    };
    setStyle();
    document.head.appendChild(style);
    let toggleTheme = document.createElement("button"),
        isAnimating = false,
        isHovering = false;
    setStyle();
    function setEmoji() {
        toggleTheme.textContent = (window.BROWSER_COLOR_SCHEME_VALUE == "dark" ? emojis.light : emojis.dark)
    };
    function spinEmojiOut() {
        isAnimating = true;
        toggleTheme.style.opacity = "0";
        toggleTheme.classList.add("spin-out");
        toggleTheme.addEventListener("animationend", function animationOutEnd ({
            animationName
        }) {
            if (animationName == "spin-out") {
                toggleTheme.classList.remove("spin-out");
                setEmoji();
                spinEmojiIn();
                toggleTheme.removeEventListener("animationend", animationOutEnd)
            }
        })
    };
    function spinEmojiIn() {
        toggleTheme.style.opacity = (isHovering ? "1" : "0.5");
        toggleTheme.classList.add("spin-in");
        toggleTheme.addEventListener("animationend", function animationInEnd ({
            animationName
        }) {
            if (animationName == "spin-in") {
                toggleTheme.classList.remove("spin-in");
                toggleTheme.style.opacity = (isHovering ? "1" : "0.5");
                toggleTheme.style.transform = "scale(var(--scale-value))";
                isAnimating = false;
                toggleTheme.removeEventListener("animationend", animationInEnd)
            }
        })
    };
    toggleTheme.style.position = "fixed";
    toggleTheme.style.bottom = "2vh";
    toggleTheme.style.right = "2vh";
    toggleTheme.style.fontSize = "3vw";
    toggleTheme.style.background = "none";
    toggleTheme.style.color = "rgb(255, 255, 255)";
    toggleTheme.style.opacity = "0.5";
    toggleTheme.style.padding = "0px";
    toggleTheme.style.border = "none";
    toggleTheme.style.cursor = "pointer";
    toggleTheme.style.display = "inline-block";
    toggleTheme.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    toggleTheme.style.transform = "scale(var(--scale-value))";
    toggleTheme.style.setProperty("user-select", "none");
    toggleTheme.setAttribute("unselectable", "on");
    setEmoji();
    toggleTheme.addEventListener("mouseover", function () {
        isHovering = true;
        setStyle("1.3");
        if (!isAnimating)
            this.style.opacity = "1"
    });
    toggleTheme.addEventListener("mouseout", function () {
        isHovering = false;
        setStyle();
        if (!isAnimating)
            this.style.opacity = "0.5"
    });
    toggleTheme.addEventListener("click", function () {
        if (!isAnimating)
        {
            switch (window.BROWSER_COLOR_SCHEME_VALUE) {
                case "dark":
                    BROWSER_COLOR_SCHEME("light");
                    break
                default:
                    BROWSER_COLOR_SCHEME("dark")
            }
            spinEmojiOut()
        }
    });
    document.body.appendChild(toggleTheme)
})