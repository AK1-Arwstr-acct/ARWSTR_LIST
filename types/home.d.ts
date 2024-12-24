interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
}

interface FormData {
  userName: string,
  email: string,
  phoneNumber?: string,
  selectedGrade: OptionAttributes | null,
  selectedBudget: OptionAttributes | null,
  selectedCountry: OptionAttributes | null,
}

interface Country {
  id: number,
  title: string,
  phone_code: string,
  flag: string
}


export { OptionAttributes, FormData, Country }