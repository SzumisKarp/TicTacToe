<?php
/*
Plugin Name: Tic Tac Toe
Description: Simple Tic Tac Toe game for WordPress.
Version: 0.1.7
Author: Your Name
*/

// Add scripts and styles
function tic_tac_toe_enqueue_scripts() {
    wp_enqueue_script('tic-tac-toe-script', plugin_dir_url(__FILE__) . 'js/tic-tac-toe.js', array(), '2.3', true);
    wp_enqueue_style('tic-tac-toe-style', plugin_dir_url(__FILE__) . 'css/tic-tac-toe.css');
}
add_action('wp_enqueue_scripts', 'tic_tac_toe_enqueue_scripts');

// Shortcode for the game
function tic_tac_toe_shortcode() {
    ob_start();
    ?>
    <div id="tic-tac-toe">
        <table>
            <tr>
                <td class="cell" data-index="0"></td>
                <td class="cell" data-index="1"></td>
                <td class="cell" data-index="2"></td>
            </tr>
            <tr>
                <td class="cell" data-index="3"></td>
                <td class="cell" data-index="4"></td>
                <td class="cell" data-index="5"></td>
            </tr>
            <tr>
                <td class="cell" data-index="6"></td>
                <td class="cell" data-index="7"></td>
                <td class="cell" data-index="8"></td>
            </tr>
        </table>
        <div id="result"></div>
        <div id="scores">
            <span id="playerXScore">Player X: 0</span>
            <span id="playerOScore">Player O: 0</span>
        </div>
        <button id="resetButton">Zagraj ponownie</button>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('tic_tac_toe', 'tic_tac_toe_shortcode');
?>
