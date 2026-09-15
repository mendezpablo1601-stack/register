/* =====================================================
   DASHBOARD OCEÁNICO — datos reales extraídos de
   Ocean_Conservation_Dashboard.xlsx (hojas 01 a 06)
===================================================== */

const OCEAN_DATA = {
    clima: {
        years: [1993, 1995, 2000, 2005, 2010, 2015, 2020, 2025],
        seaLevel: [0, 6.4, 21.2, 37.5, 52.8, 73.1, 94.7, 114.2],
        oceanHeat: [0, 12, 38, 69, 102, 145, 198, 242]
    },
    oxigeno: {
        years: [2000, 2010, 2020, 2025],
        o2Loss: [1.45, 1.82, 2.18, 2.45],
        anoxicArea: [4.2, 5.1, 5.9, 6.4]
    },
    biodiversidad: {
        years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025],
        mamiferos: [120, 145, 180, 210, 245, 290, 320, 345],
        tiburones: [150, 190, 240, 310, 395, 480, 560, 620],
        tortugas: [4, 5, 6, 6, 7, 7, 7, 7],
        corales: [80, 120, 210, 380, 590, 720, 850, 910]
    },
    contaminacion: {
        years: [1970, 1980, 1990, 2000, 2010, 2020, 2025],
        plomo: [12.5, 18.2, 24.0, 29.5, 35.1, 42.0, 46.8],
        mercurio: [1.8, 2.4, 3.1, 3.9, 4.8, 5.6, 6.2],
        cadmio: [3.1, 4.0, 4.8, 5.5, 6.2, 7.1, 7.8],
        arsenico: [8.5, 10.2, 12.0, 14.3, 17.1, 20.4, 22.5],
        ddt: [45.0, 38.0, 29.0, 21.0, 15.2, 11.8, 9.5]
    },
    manglares: [
        { region: "Sudeste Asiático", a2000: 68200, a2025: 54500, perdida: 0.201 },
        { region: "África Occidental", a2000: 21500, a2025: 18200, perdida: 0.153 },
        { region: "Pacífico Oriental / Latam", a2000: 24100, a2025: 21000, perdida: 0.129 },
        { region: "Asia Meridional", a2000: 11200, a2025: 9800, perdida: 0.125 },
        { region: "Caribe y Atlántico Medio", a2000: 16800, a2025: 13900, perdida: 0.173 },
        { region: "Medio Oriente y Red Sea", a2000: 4500, a2025: 4100, perdida: 0.089 }
    ],
    rios: [
        { rio: "Pasig", zona: "Filipinas", descarga: 356000, pct: 0.380 },
        { rio: "Ganges", zona: "India / Bangladesh", descarga: 115000, pct: 0.122 },
        { rio: "Yiza (Yangtsé)", zona: "China", descarga: 85000, pct: 0.091 },
        { rio: "Ciliwung", zona: "Indonesia", descarga: 64000, pct: 0.068 },
        { rio: "Amazonas", zona: "Brasil / Perú / Col.", descarga: 38000, pct: 0.040 },
        { rio: "Nilo", zona: "Egipto / Sudán", descarga: 29000, pct: 0.031 },
        { rio: "Mekong", zona: "Vietnam / Camboya / Laos", descarga: 22800, pct: 0.024 },
        { rio: "Brantas", zona: "Indonesia", descarga: 19500, pct: 0.021 }
    ]
};

// ---- Cifras derivadas (calculadas a partir de los datos anteriores, no inventadas) ----
const manglaresTotal2000 = OCEAN_DATA.manglares.reduce((s, r) => s + r.a2000, 0);
const manglaresTotal2025 = OCEAN_DATA.manglares.reduce((s, r) => s + r.a2025, 0);
const manglaresPerdidaGlobal = (manglaresTotal2000 - manglaresTotal2025) / manglaresTotal2000;
const riosTotalDescarga = OCEAN_DATA.rios.reduce((s, r) => s + r.descarga, 0);
const riosPctGlobal = OCEAN_DATA.rios.reduce((s, r) => s + r.pct, 0);
const especiesBajoPresion =
    OCEAN_DATA.biodiversidad.mamiferos.at(-1) +
    OCEAN_DATA.biodiversidad.tiburones.at(-1) +
    OCEAN_DATA.biodiversidad.tortugas.at(-1) +
    OCEAN_DATA.biodiversidad.corales.at(-1);

const CHART_FONT = "'Montserrat', sans-serif";
const GRID_COLOR = "rgba(111,194,255,0.08)";
const TICK_COLOR = "rgba(234,246,255,0.55)";
Chart.defaults.font.family = CHART_FONT;
Chart.defaults.color = TICK_COLOR;

function baseScales(extra) {
    return Object.assign({
        x: { grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR } },
        y: { grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR } }
    }, extra || {});
}

function renderCharts() {
    // Panorama: nivel del mar + calor del océano
    new Chart(document.getElementById('chartPanorama'), {
        type: 'line',
        data: {
            labels: OCEAN_DATA.clima.years,
            datasets: [
                { label: 'Nivel del mar (mm)', data: OCEAN_DATA.clima.seaLevel, borderColor: '#6fc2ff', backgroundColor: 'rgba(111,194,255,0.12)', fill: true, tension: 0.35, yAxisID: 'y' },
                { label: 'Calor del océano (ZJ)', data: OCEAN_DATA.clima.oceanHeat, borderColor: '#d4af6a', backgroundColor: 'transparent', tension: 0.35, yAxisID: 'y1' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12 } } },
            scales: baseScales({
                y: { position: 'left', grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR } },
                y1: { position: 'right', grid: { display: false }, ticks: { color: TICK_COLOR } }
            })
        }
    });

    // Clima: nivel del mar / calor
    new Chart(document.getElementById('chartClima'), {
        type: 'line',
        data: {
            labels: OCEAN_DATA.clima.years,
            datasets: [
                { label: 'Nivel del mar (mm)', data: OCEAN_DATA.clima.seaLevel, borderColor: '#6fc2ff', backgroundColor: 'rgba(111,194,255,0.12)', fill: true, tension: 0.35 },
                { label: 'Calor del océano (ZJ)', data: OCEAN_DATA.clima.oceanHeat, borderColor: '#d4af6a', tension: 0.35 }
            ]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12 } } }, scales: baseScales() }
    });

    // Oxígeno: pérdida O2 / área anóxica
    new Chart(document.getElementById('chartOxigeno'), {
        type: 'bar',
        data: {
            labels: OCEAN_DATA.oxigeno.years,
            datasets: [
                { label: 'Pérdida de O₂ (%)', data: OCEAN_DATA.oxigeno.o2Loss, backgroundColor: '#ff8f6b', borderRadius: 6, yAxisID: 'y' },
                { label: 'Área anóxica (M km²)', data: OCEAN_DATA.oxigeno.anoxicArea, backgroundColor: '#6fc2ff', borderRadius: 6, yAxisID: 'y1' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12 } } },
            scales: baseScales({
                y: { position: 'left', grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR } },
                y1: { position: 'right', grid: { display: false }, ticks: { color: TICK_COLOR } }
            })
        }
    });

    // Biodiversidad: series por especie
    new Chart(document.getElementById('chartBiodiversidad'), {
        type: 'line',
        data: {
            labels: OCEAN_DATA.biodiversidad.years,
            datasets: [
                { label: 'Mamíferos marinos', data: OCEAN_DATA.biodiversidad.mamiferos, borderColor: '#6fc2ff', tension: 0.3 },
                { label: 'Tiburones y rayas', data: OCEAN_DATA.biodiversidad.tiburones, borderColor: '#d4af6a', tension: 0.3 },
                { label: 'Tortugas marinas', data: OCEAN_DATA.biodiversidad.tortugas, borderColor: '#6de6b0', tension: 0.3 },
                { label: 'Corales formadores de arrecife', data: OCEAN_DATA.biodiversidad.corales, borderColor: '#ff8f6b', tension: 0.3 }
            ]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12 } } }, scales: baseScales() }
    });

    // Donut especies bajo presión (2025)
    new Chart(document.getElementById('chartEspecies'), {
        type: 'doughnut',
        data: {
            labels: ['Mamíferos marinos', 'Tiburones y rayas', 'Tortugas marinas', 'Corales formadores'],
            datasets: [{
                data: [
                    OCEAN_DATA.biodiversidad.mamiferos.at(-1),
                    OCEAN_DATA.biodiversidad.tiburones.at(-1),
                    OCEAN_DATA.biodiversidad.tortugas.at(-1),
                    OCEAN_DATA.biodiversidad.corales.at(-1)
                ],
                backgroundColor: ['#6fc2ff', '#d4af6a', '#6de6b0', '#ff8f6b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '68%',
            plugins: { legend: { position: 'bottom', labels: { color: TICK_COLOR, boxWidth: 10, font: { size: 10.5 } } } }
        }
    });

    // Contaminación química
    new Chart(document.getElementById('chartContaminacion'), {
        type: 'line',
        data: {
            labels: OCEAN_DATA.contaminacion.years,
            datasets: [
                { label: 'Plomo (Pb)', data: OCEAN_DATA.contaminacion.plomo, borderColor: '#6fc2ff', tension: 0.3 },
                { label: 'Mercurio (Hg)', data: OCEAN_DATA.contaminacion.mercurio, borderColor: '#d4af6a', tension: 0.3 },
                { label: 'Cadmio (Cd)', data: OCEAN_DATA.contaminacion.cadmio, borderColor: '#6de6b0', tension: 0.3 },
                { label: 'Arsénico (As)', data: OCEAN_DATA.contaminacion.arsenico, borderColor: '#ff8f6b', tension: 0.3 },
                { label: 'DDT y PCBs (COPs)', data: OCEAN_DATA.contaminacion.ddt, borderColor: '#c98bff', tension: 0.3 }
            ]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12, font: { size: 10.5 } } } }, scales: baseScales() }
    });

    // Manglares: 2000 vs 2025 por región
    new Chart(document.getElementById('chartManglares'), {
        type: 'bar',
        data: {
            labels: OCEAN_DATA.manglares.map(r => r.region),
            datasets: [
                { label: 'Área 2000 (km²)', data: OCEAN_DATA.manglares.map(r => r.a2000), backgroundColor: '#6fc2ff', borderRadius: 5 },
                { label: 'Área 2025 (km²)', data: OCEAN_DATA.manglares.map(r => r.a2025), backgroundColor: '#ff8f6b', borderRadius: 5 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: TICK_COLOR, boxWidth: 12 } } },
            scales: baseScales({ x: { grid: { display: false }, ticks: { color: TICK_COLOR, font: { size: 10 } } } })
        }
    });

    // Ríos: descarga de plástico
    new Chart(document.getElementById('chartRios'), {
        type: 'bar',
        data: {
            labels: OCEAN_DATA.rios.map(r => r.rio),
            datasets: [{ label: 'Descarga estimada (t/año)', data: OCEAN_DATA.rios.map(r => r.descarga), backgroundColor: '#6fc2ff', borderRadius: 6 }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: baseScales()
        }
    });
}

function fillDerivedText() {
    document.querySelectorAll('[data-kpi="especies-presion"]').forEach(el => el.textContent = especiesBajoPresion.toLocaleString('es-CO'));
    document.querySelectorAll('[data-kpi="manglares-perdida"]').forEach(el => el.textContent = '−' + (manglaresPerdidaGlobal * 100).toFixed(1) + ' %');
    document.querySelectorAll('[data-kpi="rios-total"]').forEach(el => el.textContent = (riosTotalDescarga / 1000).toFixed(0) + ' mil t/año');
    document.querySelectorAll('[data-kpi="rios-pct"]').forEach(el => el.textContent = (riosPctGlobal * 100).toFixed(1) + ' %');
}

function buildManglaresTable() {
    const tbody = document.getElementById('manglaresBody');
    if (!tbody) return;
    tbody.innerHTML = OCEAN_DATA.manglares.map(r => `
        <tr>
            <td><b>${r.region}</b></td>
            <td>${r.a2000.toLocaleString('es-CO')} km²</td>
            <td>${r.a2025.toLocaleString('es-CO')} km²</td>
            <td>
                −${(r.perdida * 100).toFixed(1)} %
                <div class="do-bar-track"><div class="do-bar-fill warn" style="width:${(r.perdida * 100 * 3.5).toFixed(0)}%"></div></div>
            </td>
        </tr>
    `).join('');
}

function buildRiosTable() {
    const tbody = document.getElementById('riosBody');
    if (!tbody) return;
    tbody.innerHTML = OCEAN_DATA.rios.map(r => `
        <tr>
            <td><b>${r.rio}</b></td>
            <td>${r.zona}</td>
            <td>${r.descarga.toLocaleString('es-CO')} t/año</td>
            <td>
                ${(r.pct * 100).toFixed(1)} %
                <div class="do-bar-track"><div class="do-bar-fill" style="width:${(r.pct * 100 * 2.5).toFixed(0)}%"></div></div>
            </td>
        </tr>
    `).join('');
}

function setupTabs() {
    const tabs = document.querySelectorAll('.do-tab');
    const panels = document.querySelectorAll('.do-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.panel).classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fillDerivedText();
    buildManglaresTable();
    buildRiosTable();
    setupTabs();
    renderCharts();
});
