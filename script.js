let currentBalance = 0;
let currentAlias = '';
let qrScannerActive = false;

// Inicializar síntesis de voz
const synth = window.speechSynthesis;

function speakAmount() {
    try {
        const amount = document.getElementById('transferAmount').value;
        const speakButton = document.querySelector('.speak-button');
        
        if (!amount || amount === '') {
            showMessage('Por favor, ingrese un monto primero.', 'error');
            return;
        }
        
        const numAmount = parseFloat(amount);
        if (numAmount <= 0) {
            showMessage('Por favor, ingrese un monto válido.', 'error');
            return;
        }
        
        // Detener cualquier reproducción anterior
        if (synth.speaking) {
            synth.cancel();
        }
        
        const textAmount = numberToWords(Math.floor(numAmount));
        const textCapitalized = textAmount.charAt(0).toUpperCase() + textAmount.slice(1);
        const currencyWord = numAmount === 1 ? 'peso' : 'pesos';
        const textToSpeak = `${textCapitalized} ${currencyWord}`;
        
        // Crear el objeto de voz
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES'; // Español
        utterance.rate = 0.9; // Velocidad un poco más lenta para mejor comprensión
        utterance.pitch = 1; // Tono normal
        utterance.volume = 1; // Volumen máximo
        
        // Cambiar el botón mientras se está reproduciendo
        if (speakButton) {
            speakButton.disabled = true;
            speakButton.textContent = '🔊 Reproduciendo...';
        }
        
        // Cuando termina la reproducción
        utterance.onend = function() {
            if (speakButton) {
                speakButton.disabled = false;
                speakButton.textContent = '🔊 Escuchar';
            }
        };
        
        utterance.onerror = function(error) {
            if (speakButton) {
                speakButton.disabled = false;
                speakButton.textContent = '🔊 Escuchar';
            }
            console.error('Error de síntesis de voz:', error);
            showMessage('Error al reproducir la voz.', 'error');
        };
        
        // Iniciar la reproducción
        synth.speak(utterance);
    } catch (error) {
        console.error('Error en speakAmount:', error);
        showMessage('Error al intentar reproducir la voz.', 'error');
    }
}

// Función para convertir números a texto
function numberToWords(num) {
    if (num === 0) return 'Cero';
    
    const ones = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const onesCapitalized = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
    const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const teensCapitalized = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const tensCapitalized = ['', '', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
    const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
    const hundredsCapitalized = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];
    
    function convertBelow1000(n, isFirst = true) {
        let result = '';
        
        const h = Math.floor(n / 100);
        const t = Math.floor((n % 100) / 10);
        const u = n % 10;
        
        if (h > 0) {
            if (h === 1 && t === 0 && u === 0) {
                result += isFirst ? 'Cien' : 'cien';
            } else {
                result += isFirst ? hundredsCapitalized[h] : hundreds[h];
            }
        }
        
        if (t > 1) {
            result += (result ? ' ' : '') + (isFirst && !result ? tensCapitalized[t] : tens[t]);
            if (u > 0) {
                result += ' y ' + ones[u];
            }
        } else if (t === 1) {
            result += (result ? ' ' : '') + (isFirst && !result ? teensCapitalized[u] : teens[u]);
        } else if (u > 0) {
            if (isFirst && !result) {
                result += onesCapitalized[u];
            } else {
                result += (result ? ' ' : '') + ones[u];
            }
        }
        
        return result;
    }
    
    if (num < 1000) {
        return convertBelow1000(num, true);
    }
    
    const millions = Math.floor(num / 1000000);
    const thousands = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;
    
    let result = '';
    
    if (millions > 0) {
        result += convertBelow1000(millions, true);
        result += millions === 1 ? ' millón' : ' millones';
    }
    
    if (thousands > 0) {
        if (thousands === 1) {
            result += (result ? ' ' : '') + 'mil';
        } else {
            result += (result ? ' ' : '') + convertBelow1000(thousands, false) + ' mil';
        }
    }
    
    if (remainder > 0) {
        result += (result ? ' ' : '') + convertBelow1000(remainder, false);
    }
    
    return result;
}

function updateTransferText() {
    const amount = document.getElementById('transferAmount').value;
    const displayElement = document.getElementById('transferTextDisplay');
    
    if (!amount || amount === '') {
        displayElement.textContent = 'Ingrese el monto';
        displayElement.style.color = '#7f8c8d';
    } else {
        const numAmount = parseFloat(amount);
        if (numAmount > 0) {
            const textAmount = numberToWords(Math.floor(numAmount));
            // Capitalizar la primera letra
            const textCapitalized = textAmount.charAt(0).toUpperCase() + textAmount.slice(1);
            // Usar "peso" en singular si es 1, "pesos" en plural en otros casos
            const currencyWord = numAmount === 1 ? 'peso' : 'pesos';
            displayElement.textContent = `${textCapitalized} ${currencyWord}`;
            displayElement.style.color = '#2c3e50';
        } else {
            displayElement.textContent = 'Ingrese un monto válido';
            displayElement.style.color = '#e74c3c';
        }
    }
}

function showScreen(screenId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Mostrar la pantalla seleccionada
    document.getElementById(screenId).classList.add('active');
}

function setInitialBalance() {
    const initialAmount = document.getElementById('initialAmount').value;
    if (initialAmount && initialAmount > 0) {
        currentBalance = parseFloat(initialAmount);
        updateBalanceDisplay();
        showMessage('Saldo inicial establecido correctamente.', 'success');
        // Pasar a la pantalla de alias
        showScreen('aliasScreen');
    } else {
        showMessage('Por favor, ingrese un monto inicial válido.', 'error');
    }
}

function confirmAlias() {
    const alias = document.getElementById('alias').value;
    if (alias) {
        currentAlias = alias;
        document.getElementById('selectedAlias').textContent = `Para: ${alias}`;
        updateBalanceDisplay();
        showScreen('amountScreen');
    } else {
        showMessage('Por favor, ingrese un alias válido.', 'error');
    }
}

function makeTransfer() {
    const transferAmount = parseFloat(document.getElementById('transferAmount').value);

    if (!transferAmount || transferAmount <= 0) {
        showMessage('Por favor, ingrese un monto válido.', 'error');
        return;
    }

    if (transferAmount > currentBalance) {
        showMessage('No tiene saldo suficiente para realizar esta transferencia.', 'error');
        return;
    }

    // Realizar la transferencia
    currentBalance -= transferAmount;
    
    // Actualizar la pantalla de resultado
    document.getElementById('transferDetails').textContent = 
        `Transferiste $${transferAmount.toFixed(2)} a ${currentAlias}`;
    
    // Mostrar pantalla de resultado
    showScreen('resultScreen');
}

function startNewTransfer() {
    // Limpiar campos
    document.getElementById('alias').value = '';
    document.getElementById('transferAmount').value = '';
    document.getElementById('transferTextDisplay').textContent = 'Ingrese el monto';
    document.getElementById('transferTextDisplay').style.color = '#7f8c8d';
    
    // Volver a la pantalla de alias
    updateBalanceDisplay();
    showScreen('aliasScreen');
}

function updateBalanceDisplay() {
    // Actualizar saldo en todas las pantallas que lo muestran
    document.getElementById('currentBalance').textContent = `$${currentBalance.toFixed(2)}`;
    document.getElementById('currentBalanceAmount').textContent = `$${currentBalance.toFixed(2)}`;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hacer que el mensaje desaparezca después de 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Funciones para escaneo QR
function startQRScanner() {
    const qrModal = document.getElementById('qrModal');
    const video = document.getElementById('qrVideo');
    
    qrModal.classList.add('active');
    qrScannerActive = true;
    
    // Solicitar acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            scanQRCode();
        })
        .catch(error => {
            console.error('Error al acceder a la cámara:', error);
            showMessage('Error al acceder a la cámara del dispositivo.', 'error');
            closeQRScanner();
        });
}

function scanQRCode() {
    const video = document.getElementById('qrVideo');
    const canvas = document.getElementById('qrCanvas');
    const canvasContext = canvas.getContext('2d');
    const statusElement = document.getElementById('qrStatus');
    
    const check = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
                // QR encontrado
                const qrValue = code.data;
                processQRData(qrValue);
                return;
            } else {
                statusElement.textContent = 'Apunta la cámara al código QR';
            }
        }
        
        if (qrScannerActive) {
            requestAnimationFrame(check);
        }
    };
    
    check();
}

function processQRData(qrData) {
    // Intentar extraer el monto del código QR
    // El formato esperado puede ser: "monto:1500" o simplemente "1500"
    let amount = null;
    
    // Intentar diferentes formatos
    if (qrData.includes(':')) {
        const parts = qrData.split(':');
        amount = parseFloat(parts[parts.length - 1]);
    } else {
        amount = parseFloat(qrData);
    }
    
    if (!isNaN(amount) && amount > 0) {
        // Si es un número válido, lo usamos como monto
        document.getElementById('transferAmount').value = amount;
        updateTransferText();
        closeQRScanner();
        showMessage(`Monto $${amount.toFixed(2)} ingresado desde QR.`, 'success');
    } else {
        // Si el QR contiene otro tipo de datos, mostramos un mensaje
        showMessage(`Código QR: ${qrData}`, 'error');
    }
}

function closeQRScanner() {
    const qrModal = document.getElementById('qrModal');
    const video = document.getElementById('qrVideo');
    
    qrScannerActive = false;
    qrModal.classList.remove('active');
    
    // Detener la cámara
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
}