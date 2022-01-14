package com.jussi.whydos;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class EpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
        try {
            String flag = intent.getStringExtra("flag");
            Toast.makeText(context, flag, Toast.LENGTH_LONG).show();
        } catch (Exception err) {
            err.printStackTrace();
        }
    }
}
