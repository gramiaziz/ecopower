<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Nouvelle commande {{ $order->id }}</title></head>
<body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
    <tr><td style="background:#0f766e;color:#ffffff;padding:20px 24px;">
        <h1 style="margin:0;font-size:20px;">Nouvelle commande {{ $order->id }}</h1>
        <p style="margin:4px 0 0;font-size:13px;opacity:.9;">{{ \Carbon\Carbon::parse($order->created_at ?? now())->format('d/m/Y H:i') }}</p>
    </td></tr>

    <tr><td style="padding:24px;">
        <h2 style="font-size:15px;margin:0 0 8px;">Client</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
            <strong>{{ $order->customer_name }}</strong><br>
            Tél : {{ $order->customer_phone }}<br>
            @if (!empty($order->customer_email)) Email : {{ $order->customer_email }}<br>@endif
            @if ($order->delivery_method === 'pickup')
                Retrait au local : {{ config('ecopower.pickup_address') }}
            @else
                Adresse : {{ $order->customer_address }}@if (!empty($order->customer_city)), {{ $order->customer_city }}@endif
                @if (!empty($order->customer_governorate)) ({{ $order->customer_governorate }})@endif
            @endif
        </p>

        <h2 style="font-size:15px;margin:0 0 8px;">Articles</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
            <tr style="background:#f3f4f6;text-align:left;">
                <th>Produit</th><th style="text-align:center;">Qté</th><th style="text-align:right;">Prix</th>
            </tr>
            @foreach ($items as $item)
                <tr style="border-bottom:1px solid #e5e7eb;">
                    <td>{{ $item->name }}</td>
                    <td style="text-align:center;">{{ $item->quantity }}</td>
                    <td style="text-align:right;">{{ number_format((float) $item->price * (int) $item->quantity, 2, ',', ' ') }} TND</td>
                </tr>
            @endforeach
        </table>

        <table width="100%" cellpadding="3" cellspacing="0" style="font-size:14px;margin-top:12px;">
            <tr><td>Sous-total</td><td style="text-align:right;">{{ number_format((float) $order->subtotal, 2, ',', ' ') }} TND</td></tr>
            @if ((float) ($order->discount ?? 0) > 0)
                <tr><td>Remise retrait</td><td style="text-align:right;">- {{ number_format((float) $order->discount, 2, ',', ' ') }} TND</td></tr>
            @endif
            <tr><td>Livraison</td><td style="text-align:right;">{{ (float) $order->delivery_fee > 0 ? number_format((float) $order->delivery_fee, 2, ',', ' ').' TND' : 'Gratuite' }}</td></tr>
            <tr><td><strong>Total</strong></td><td style="text-align:right;"><strong>{{ number_format((float) $order->total, 2, ',', ' ') }} TND</strong></td></tr>
        </table>

        <p style="font-size:14px;margin:16px 0 0;">
            Paiement :
            @if ($order->payment_method === 'card')
                carte bancaire ({{ ($order->payment_status ?? '') === 'paid' ? 'payé' : 'en attente' }})
            @else
                espèces à la {{ $order->delivery_method === 'pickup' ? 'retrait' : 'livraison' }}
            @endif
        </p>

        @if (!empty($order->notes))
            <p style="font-size:14px;margin:16px 0 0;padding:10px 12px;background:#fffbeb;border-radius:6px;"><strong>Note du client :</strong> {{ $order->notes }}</p>
        @endif

        <p style="margin:24px 0 0;"><a href="{{ $adminUrl }}" style="background:#0f766e;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:14px;">Ouvrir l'administration</a></p>
    </td></tr>
</table>
</body>
</html>
