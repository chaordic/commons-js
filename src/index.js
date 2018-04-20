/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

import http from './http';

/**
 * @module @linx/commons-js
 */
export const commons = { http };

window.top.linx = window.top.linx || {};
window.top.linx.commons = commons;
