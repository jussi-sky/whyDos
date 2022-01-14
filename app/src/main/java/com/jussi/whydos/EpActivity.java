package com.jussi.whydos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Toast;

public class EpActivity extends AppCompatActivity {

    /**
     * 以下方法都会促发序列化错误
     * getExtraxxx()
     * finish()
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ep);

        Intent intent = getIntent();
        intent.getSerializableExtra("flag");
        try {
            String flag = intent.getStringExtra("flag");
            Toast.makeText(this, flag, Toast.LENGTH_LONG).show();
        } catch (Exception err) {
            err.printStackTrace();
            finish();
        }

    }
}