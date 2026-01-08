/**
 * Walidacja numeru PESEL według algorytmu stosowanego w Polsce
 *
 * Algorytm sprawdza:
 * 1. Długość (11 cyfr)
 * 2. Czy wszystkie znaki to cyfry
 * 3. Poprawność daty urodzenia
 * 4. Cyfrę kontrolną (checksum)
 */

export function validatePESEL(pesel: string): { isValid: boolean; error?: string } {
	// Sprawdź długość
	if (pesel.length !== 11) {
		return { isValid: false, error: 'PESEL musi mieć 11 cyfr' }
	}

	// Sprawdź czy wszystkie znaki to cyfry
	if (!/^\d+$/.test(pesel)) {
		return { isValid: false, error: 'PESEL może zawierać tylko cyfry' }
	}

	// Rozłóż PESEL na cyfry
	const digits = pesel.split('').map(Number)

	// Wyciągnij datę urodzenia (YYMMDD)
	let year = digits[0] * 10 + digits[1]
	let month = digits[2] * 10 + digits[3]
	const day = digits[4] * 10 + digits[5]

	// Określ wiek na podstawie miesiąca (wiek zakodowany w miesiącu)
	if (month > 80) {
		year += 1800
		month -= 80
	} else if (month > 60) {
		year += 2200
		month -= 60
	} else if (month > 40) {
		year += 2100
		month -= 40
	} else if (month > 20) {
		year += 2000
		month -= 20
	} else {
		year += 1900
	}

	// Sprawdź poprawność daty
	if (month < 1 || month > 12) {
		return { isValid: false, error: 'Nieprawidłowy miesiąc w PESEL' }
	}

	if (day < 1 || day > 31) {
		return { isValid: false, error: 'Nieprawidłowy dzień w PESEL' }
	}

	// Sprawdź czy data jest prawidłowa (czy dzień istnieje w danym miesiącu)
	const date = new Date(year, month - 1, day)
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
		return { isValid: false, error: 'Nieprawidłowa data urodzenia w PESEL' }
	}

	// Sprawdź czy data nie jest w przyszłości
	if (date > new Date()) {
		return { isValid: false, error: 'Data urodzenia nie może być w przyszłości' }
	}

	// Walidacja cyfry kontrolnej (checksum) - algorytm PESEL
	const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
	let sum = 0

	for (let i = 0; i < 10; i++) {
		sum += digits[i] * weights[i]
	}

	// Oblicz cyfrę kontrolną
	const checksum = sum % 10 === 0 ? 0 : 10 - (sum % 10)

	// Porównaj z ostatnią cyfrą PESEL
	if (checksum !== digits[10]) {
		return { isValid: false, error: 'Nieprawidłowa cyfra kontrolna PESEL' }
	}

	return { isValid: true }
}

/**
 * Wyciąga płeć z numeru PESEL
 * Nieparzysta cyfra przedostatnia = mężczyzna
 * Parzysta cyfra przedostatnia = kobieta
 */
export function getGenderFromPESEL(pesel: string): 'male' | 'female' | null {
	if (pesel.length !== 11) return null

	const genderDigit = parseInt(pesel[9])
	return genderDigit % 2 === 0 ? 'female' : 'male'
}

/**
 * Wyciąga datę urodzenia z PESEL
 */
export function getBirthDateFromPESEL(pesel: string): Date | null {
	if (pesel.length !== 11) return null

	const digits = pesel.split('').map(Number)

	let year = digits[0] * 10 + digits[1]
	let month = digits[2] * 10 + digits[3]
	const day = digits[4] * 10 + digits[5]

	// Określ wiek
	if (month > 80) {
		year += 1800
		month -= 80
	} else if (month > 60) {
		year += 2200
		month -= 60
	} else if (month > 40) {
		year += 2100
		month -= 40
	} else if (month > 20) {
		year += 2000
		month -= 20
	} else {
		year += 1900
	}

	return new Date(year, month - 1, day)
}
