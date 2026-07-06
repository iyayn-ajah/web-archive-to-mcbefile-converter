let selectedFile = null;

const fileInput = document.getElementById("file");
const filename = document.getElementById("filename");

const archiveExtensions = [
    ".tar.gz",
    ".tar.xz",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".xz"
];

const minecraftExtensions = [
    ".mcpack",
    ".mcaddon",
    ".mcworld"
];

fileInput.addEventListener("change", () => {

    if (!fileInput.files.length) return;

    selectedFile = fileInput.files[0];
    filename.textContent = selectedFile.name;

});

function getOutputName(name, selectedExtension) {

    let lower = name.toLowerCase();
    let archive = "";

    const sortedExtensions = [...archiveExtensions].sort((a, b) => b.length - a.length);

    for (const ext of sortedExtensions) {
        if (lower.endsWith(ext)) {
            archive = ext;
            break;
        }
    }

    if (!archive) {
        return null;
    }

    name = name.slice(0, -archive.length);

    const lowerName = name.toLowerCase();

    for (const ext of minecraftExtensions) {
        if (lowerName.endsWith(ext)) {
            return name;
        }
    }

    return name + selectedExtension;
}

document.getElementById("convert").addEventListener("click", () => {

    if (!selectedFile) {
        alert("Please select an archive file first.");
        return;
    }

    const outputName = getOutputName(
        selectedFile.name,
        document.getElementById("type").value
    );

    if (outputName === null) {
        alert("Unsupported archive file.");
        return;
    }

    const blob = new Blob([selectedFile], {
        type: "application/octet-stream"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

});

const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const html = document.documentElement;
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    enableLightMode();
}

themeToggleBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    if (html.classList.contains('dark')) {
        enableLightMode();
        localStorage.setItem('theme', 'light');
    } else {
        enableDarkMode();
        localStorage.setItem('theme', 'dark');
    }
}

function enableLightMode() {
    html.classList.remove('dark');
    body.classList.add('light-mode');
    body.classList.remove('bg-black', 'text-white');
    body.classList.add('bg-whitish', 'text-blackish');
    
    document.querySelectorAll('.border-white').forEach(element => {
        element.classList.remove('border-white');
        element.classList.add('border-blackish');
    });
    
    document.querySelectorAll('#convert').forEach(element => {
        element.classList.remove('border-white', 'hover:bg-white', 'hover:text-black');
        element.classList.add('border-blackish', 'hover:bg-blackish', 'hover:text-white');
    });

    document.querySelectorAll('input[type="file"], select').forEach(element => {
        element.style.borderColor = '#333';
        element.style.color = '#333';
    });
    
    themeToggleBtn.classList.remove('bg-black', 'border-white');
    themeToggleBtn.classList.add('bg-white', 'border-blackish');
    
    themeToggleDarkIcon.classList.add('hidden');
    themeToggleLightIcon.classList.remove('hidden');
}

function enableDarkMode() {
    html.classList.add('dark');
    body.classList.remove('light-mode');
    body.classList.remove('bg-whitish', 'text-blackish');
    body.classList.add('bg-black', 'text-white');
    
    document.querySelectorAll('.border-blackish').forEach(element => {
        element.classList.remove('border-blackish');
        element.classList.add('border-white');
    });
    
    document.querySelectorAll('#convert').forEach(element => {
        element.classList.remove('border-blackish', 'hover:bg-blackish', 'hover:text-white');
        element.classList.add('border-white', 'hover:bg-white', 'hover:text-black');
    });

    document.querySelectorAll('input[type="file"], select').forEach(element => {
        element.style.borderColor = '#fff';
        element.style.color = '#fff';
    });
    
    themeToggleBtn.classList.remove('bg-white', 'border-blackish');
    themeToggleBtn.classList.add('bg-black', 'border-white');
    
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIcon.classList.add('hidden');
}
