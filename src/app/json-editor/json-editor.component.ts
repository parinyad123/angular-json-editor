import { Component } from '@angular/core'; 
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ClipboardModule],
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent {
  value = `{
  "first_name": "John",
  "last_name": "Smith",
  "is_alive": true,
  "age": 27,
  "address": {
    "street_address": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10021-3100"
  },
  "phone_numbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [
    "Catherine",
    "Thomas",
    "Trevor"
  ],
  "spouse": null
}`;

  validationResult: string = '';

  // JSON Validation Method
  validateJson() {
    const result = this.findJsonError(this.value);
    if (result.valid) {
      this.validationResult = 'The JSON string is valid.';
    } else {
      this.validationResult = `The JSON string is invalid.\nDetails: ${result.errorDetails}`;
    }
  }

  // JSON Error Detection Method
  findJsonError(jsonString: string): { valid: boolean; errorDetails?: string } {
    try {
      JSON.parse(jsonString); // Try parsing the JSON string
      return { valid: true }; // Return valid if parsing succeeds
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Try to extract position information from the error message
        const positionMatch = error.message.match(/position (\d+)/);
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const contextStart = Math.max(0, position - 10);
          const contextEnd = Math.min(jsonString.length, position + 10);

          const context = jsonString.substring(contextStart, contextEnd);
          return {
            valid: false,
            errorDetails: `Invalid JSON near position ${position}: "${context}"\n` +
              `Error: ${error.message}`,
          };
        }
        return { valid: false, errorDetails: `Error: ${error.message}` };
      }
      return { valid: false, errorDetails: 'An unknown error occurred.' };
    }
  }
}
