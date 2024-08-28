<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order_details' => 'required|array',
            'order_details.*.product_name' => 'required',
            'order_details.*.quantity' => 'required',
            'order_details.*.price' => 'required',
            'customer_name' => 'required',
            'customer_email' => 'required|email',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'order_detail.required' => 'Order detail is required',
            'order_detail.*.product_name.required' => 'Product name is required',
            'order_detail.*.quantity.required' => 'Quantity is required',
            'order_detail.*.price.required' => 'Price is required',
            'customer_name.required' => 'Customer name is required',
            'customer_email.required' => 'Customer email is required',
        ];
    }
}
